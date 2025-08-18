// scala-miner.js
// WASM loader + background loop + UI wiring

(function(){
  const state = {
    started:false,
    startTime:0,
    shares:0,
    loopTimer:null,
    pool:null,
    lastJobId:null,
    intensity:50
  };


  // WASM readiness
  let wasmReady = false;
  function waitForWasm(cb){
    if (wasmReady && typeof Module !== "undefined") return cb();
    const start = Date.now();
    const tid = setInterval(()=>{
      if (typeof Module !== "undefined" && wasmReady){
        clearInterval(tid);
        cb();
      } else if (Date.now()-start>15000){
        clearInterval(tid);
        addLog("⏳ WASM miner still not ready after 15s; will continue trying in background", "warning");
      }
    }, 250);
  }

  // ---- WASM loader ----
  const importObject = { env: {
    // stubs used by many Emscripten builds
    abort: ()=>{},
    emscripten_notify_memory_growth: ()=>{},
  }};

  function loadWasm(){
    if (typeof window.Module === "undefined") window.Module = {};
    // Ensure prints route to UI
    window.Module.print = (t)=> addLog(String(t),"info");
    window.Module.printErr = (t)=> addLog("WASM: "+String(t),"error");
    // load scala-miner.wasm from same folder
    return fetch("scala-miner.wasm")
      .then(resp => {
        if (!resp.ok) throw new Error("Failed to fetch wasm");
        if (WebAssembly.instantiateStreaming) return WebAssembly.instantiateStreaming(resp, importObject);
        return resp.arrayBuffer().then(buf => WebAssembly.instantiate(buf, importObject));
      })
      .then(obj => {
        const inst = obj.instance;
        // expose minimal Module.ccall wrapper
        window.Module = window.Module || {};
        const mem = inst.exports.memory;
        Module._ = inst.exports;
        Module.memory = mem;

        // simple ccall for string in/out (UTF-8)
        function getString(ptr){
          const heap = new Uint8Array(mem.buffer);
          let s="", i=ptr;
          while (i<heap.length && heap[i]!==0){ s+=String.fromCharCode(heap[i++]); }
          return decodeURIComponent(escape(s));
        }
        function toUtf8(str){
          const enc = unescape(encodeURIComponent(str));
          const arr = new Uint8Array(enc.length+1);
          for (let i=0;i<enc.length;i++) arr[i]=enc.charCodeAt(i);
          arr[enc.length]=0;
          return arr;
        }
        Module.ccall = function(name, rettype, argtypes, args){
          const fn = inst.exports[name];
          if (!fn) throw new Error("WASM export not found: "+name);
          // Only support string args for our use-cases
          const ptrs = [];
          const heapU8 = new Uint8Array(mem.buffer);
          function malloc(len){
            if (!Module.__heapPtr) Module.__heapPtr = 1024*1024; // 1MB offset
            const p = Module.__heapPtr;
            Module.__heapPtr += len;
            return p;
          }
          const wasmArgs = (args||[]).map((a,i)=>{
            if (argtypes && argtypes[i]==="string"){
              const data = toUtf8(String(a));
              const p = malloc(data.length);
              heapU8.set(data, p);
              ptrs.push(p);
              return p;
            }
            return a|0;
          });
          const ret = fn(...wasmArgs);
          if (rettype==="string") return getString(ret);
          return ret;
        };

        // call ctor/init if available
        try { Module._.__wasm_call_ctors && Module._.__wasm_call_ctors(); } catch{}
        try {
          const ok = Module.ccall("init_panthera","number",[],[]);
          if (ok) addLog("Panthera init OK","success"); else addLog("Panthera init returned 0","warning");
        } catch(e){ addLog("WASM init error: "+e.message,"error"); }

        addLog("WebAssembly module loaded","success");
      });
  }

  // ---- Mining control ----
  function setJob(job){
    state.lastJobId = job.job_id;
    // Some pools send height/difficulty/seed_hash; keep optional
    const blob = job.blob || "";
    const seed = job.seed_hash || "";
    const target = job.target || "";
    try {
      if (typeof Module==='undefined' || !Module.ccall){ throw new Error('Module not ready'); }
        Module.ccall("set_scala_job","number",["string","string","string","string","string"],[blob,seed,target,String(job.height||0),job.job_id||""]);
      window.__ui.setDifficulty(job.difficulty || (job.target ? parseInt(job.target,16) : 0) || 0);
      window.__ui.setHeight(job.height || 0);
    } catch(e){
      addLog("set_scala_job error: "+e.message,"error");
    }
  }

  function stepAndCollect(){
    try {
      Module.ccall("mine_step_background","void",[],[]);
      const total = Module.ccall("get_hash_count","number",[],[])|0;
      const rate  = Module.ccall("get_hash_rate","number",[],[])|0;
      // Optional share readback
      let nonce = 0, result = "";
      try {
        const curJob = Module.ccall("get_current_job_id","string",[],[]) || "";
        if (curJob && curJob === state.lastJobId){
          const maybeHash = Module.ccall("get_current_hash","string",[],[]);
          const maybeNonce= Module.ccall("get_nonce","string",[],[]);
          if (maybeHash && maybeHash.length>=64 && maybeNonce && maybeNonce.length>=8){
            nonce = maybeNonce.toLowerCase();
            result = maybeHash.toLowerCase();
          }
        }
      } catch{ /* not fatal */ }

      // Update UI
      window.__ui.setHashrate(rate);
      window.__ui.setTotalHashes(total);

      // Submit if we have a candidate
      if (result){
        state.shares++;
        window.__ui.setShares(state.shares);
        if (state.pool && state.pool.currentJob){
          state.pool.submitShare(state.pool.currentJob, nonce, result);
          // reset edge: allow wasm to move to next nonce
          try { Module.ccall("reset_hash_count","void",[],[]); } catch{}
        }
      }
    } catch(e){
      addLog("mine_step error: "+e.message,"error");
    }
  }

  function startLoop(){
    if (state.loopTimer) return;
    state.startTime = Date.now();
    window.__ui.setStatus(true);
    let secs=0;
    state.loopTimer = setInterval(()=>{
      stepAndCollect();
      secs = ((Date.now()-state.startTime)/1000)|0;
      window.__ui.setUptime(secs);
    }, 1000);
  }
  function stopLoop(){
    if (state.loopTimer){ clearInterval(state.loopTimer); state.loopTimer=null; }
    window.__ui.setStatus(false);
  }

  // ---- Public API ----
  window.scalaMiner = {
    setIntensity(v){
      state.intensity = Math.max(10, Math.min(100, v|0));
      try { Module.ccall("set_mining_intensity","void",["number"],[state.intensity]); } catch{}
      window.__ui.setIntensityLabel(state.intensity);
      addLog("Mining intensity set to "+state.intensity+"%","info");
    },
    setupFromUI(){
      const wallet = (document.getElementById("walletAddress").value||"").trim();
      const poolKey = (document.getElementById("poolSelect").value||"").trim();
      if (!wallet){ addLog("Please enter wallet address","error"); return; }
      if (!poolKey){ addLog("Please select a pool","error"); return; }
      addLog(`Connecting to ${poolKey} pool with wallet: ${wallet}`,"info");

      // connect pool
      state.pool && state.pool.close();
      state.pool = new ScalaPoolConnector();
      state.pool.onJob = (job)=> setJob(job);
      state.pool.connect(poolKey, wallet);

      // start background loop
      startLoop();
      addLog("🚀 Mining started","success");
    },
    toggleBackground(){
      if (state.loopTimer){ this.stop(); } else { this.setupFromUI(); }
      const t = document.getElementById("miningToggle");
      if (t) t.classList.toggle("active", !!state.loopTimer);
    },
    stop(){
      stopLoop();
      state.pool && state.pool.close();
      addLog("⏹ Mining stopped","warning");
    }
  };

  // Auto-load WASM on page load
  document.addEventListener("DOMContentLoaded", ()=>{
    loadWasm().catch(err=> addLog("WASM load failed: "+err.message,"error"));
  });
})();
