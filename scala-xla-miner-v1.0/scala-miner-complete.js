/****************************************************
 * Scala XLA WebAssembly Miner (UI + Connector + Solver)
 ****************************************************/

(function(){
  // ---------- Log helper ----------
  window.addLog = function(message, type="info") {
    const log = document.getElementById("miningLog");
    if (!log) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${time}] ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
    if (log.children.length > 400) log.removeChild(log.firstChild);
  };

  // ---------- Minimal WASM stubs so UI doesn't crash ----------
  window.Module = window.Module || {};
  Module.ccall = Module.ccall || function(){ return ""; };
  Module.print = Module.print || (t => addLog(String(t), "info"));
  Module.printErr = Module.printErr || (t => addLog("ERROR: " + String(t), "error"));
  Module.onRuntimeInitialized = Module.onRuntimeInitialized || function(){
    addLog("WebAssembly module ready (stub)", "warning");
  };

  // ---------- Pools via local proxy ----------
  const POOL_KEYS = new Set([
    "scalaproject_low","scalaproject_mid","scalaproject_high","scalaproject_solo",
    "herominers","fairpool","poolmine"
  ]);

  function makeProxyUrl(poolKey){
    const key = POOL_KEYS.has(poolKey) ? poolKey : "scalaproject_low";
    return `ws://localhost:8080?pool=${encodeURIComponent(key)}`;
  }

  // ---------- Connector ----------
  class ScalaPoolConnector {
    constructor(poolKey, walletAddress, workerId) {
      this.poolKey = poolKey;
      this.poolUrl = makeProxyUrl(poolKey);
      this.walletAddress = walletAddress;
      this.workerId = workerId;
      this.ws = null;
      this.messageId = 1;
      this.currentJob = null;
    }

    connect() {
      addLog("Connecting to " + this.poolKey + " pool with wallet: " + this.walletAddress, "info");
      addLog("Connecting to pool: " + this.poolUrl, "info");
      this.ws = new WebSocket(this.poolUrl);

      this.ws.onopen = () => {
        addLog("✅ Connected to Scala pool", "success");
        this.login();
      };

      this.ws.onmessage = (evt) => {
        let data = evt.data;
        try {
          const msg = JSON.parse(data);
          this.handleMessage(msg);
        } catch (e) {
          addLog("Non-JSON from pool: " + String(data).slice(0,120), "warning");
        }
      };

      this.ws.onclose = () => addLog("⚠️ Disconnected from Scala pool", "warning");
      this.ws.onerror = (err) => addLog("❌ Scala pool WebSocket error: " + (err?.message || String(err)), "error");
    }

    login() {
      const loginMessage = {
        id: this.messageId++,
        jsonrpc: "2.0",
        method: "login",
        params: {
          login: this.walletAddress,
          pass: this.workerId || "webminer",
          agent: "Scala-WebMiner/1.0"
        }
      };
      this.sendMessage(loginMessage);
      addLog("🔑 Sent login request with worker " + this.workerId, "info");
    }

    sendMessage(msg) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(msg));
      }
    }

    handleMessage(message) {
      if (message?.result?.job) {
        this.currentJob = message.result.job;
        addLog("📥 Job received (login): " + (this.currentJob.job_id || "?"), "success");
        this.trySolveJob(this.currentJob);
        return;
      }
      if (message?.method === "job" && message?.params) {
        this.currentJob = message.params;
        addLog("📥 Job received: " + (this.currentJob.job_id || "?"), "success");
        this.trySolveJob(this.currentJob);
        return;
      }
      if (message?.result?.status === "OK") {
        addLog("✅ Share accepted by pool", "success");
        const el = document.getElementById("sharesFound");
        if (el) el.textContent = String((parseInt(el.textContent||"0",10)+1));
        return;
      }
      if (message?.error) {
        addLog("❌ Pool error: " + JSON.stringify(message.error), "error");
        return;
      }
      // generic
      addLog("ℹ️ Pool message: " + JSON.stringify(message).slice(0,160), "info");
    }

    trySolveJob(job) {
      if (!job || !Module || !Module.ccall) {
        addLog("⚠️ WASM miner not ready", "warning");
        return;
      }
      try {
        const resJson = Module.ccall(
          "mine_panthera",
          "string",
          ["string","string","string","string"],
          [job.blob, job.seed_hash || "", job.target || "", "0"]
        );
        if (resJson) {
          const res = JSON.parse(resJson);
          if (res.nonce && res.result) {
            const submitMsg = {
              id: this.messageId++,
              jsonrpc: "2.0",
              method: "submit",
              params: {
                id: job.id,
                job_id: job.job_id,
                nonce: res.nonce,
                result: res.result
              }
            };
            this.sendMessage(submitMsg);
            addLog("📤 Submitted share nonce=" + res.nonce, "info");
          } else {
            addLog("⚠️ Solver returned no valid share", "warning");
          }
        } else {
          addLog("⚠️ Solver produced empty response", "warning");
        }
      } catch (e) {
        addLog("❌ solveJob error: " + e.message, "error");
      }
    }
  }

  // ---------- UI glue ----------
  let statsTimer = null;
  let startTime = 0;
  let miner = null;

  window.setupMining = function(){
    const wallet = document.getElementById("walletAddress").value.trim();
    const poolKey = document.getElementById("poolSelect").value;
    if (!wallet) return addLog("Please enter a Scala (XLA) wallet address","error");
    if (!poolKey) return addLog("Please select a mining pool","error");

    const worker = "scala_webminer_" + Math.random().toString(36).slice(2, 11);
    miner = new ScalaPoolConnector(poolKey, wallet, worker);
    miner.connect();

    document.getElementById("poolStatus").textContent = "Connecting";
    document.getElementById("miningToggle").style.opacity = "1";

    // Start UI timers
    startTime = Date.now();
    if (!statsTimer) statsTimer = setInterval(updateStatsUI, 1000);
    updateMiningStatus(true);
    addLog("🚀 Mining started", "success");
  };

  window.stopMining = function(){
    if (miner && miner.ws) miner.ws.close();
    miner = null;
    updateMiningStatus(false);
    if (statsTimer) { clearInterval(statsTimer); statsTimer = null; }
    addLog("⏹ Mining stopped", "warning");
  };

  window.toggleBackgroundMining = function(){
    const t = document.getElementById("miningToggle");
    if (!document.getElementById("walletAddress").value.trim()) {
      return addLog("Please setup mining configuration first","error");
    }
    if (t.classList.contains("active")) {
      t.classList.remove("active");
      stopMining();
    } else {
      t.classList.add("active");
      setupMining();
    }
  };

  window.updateIntensity = function(val){
    document.getElementById("intensityValue").textContent = val;
    addLog(`Mining intensity set to ${val}%`, "info");
  };

  function updateMiningStatus(active){
    const e = document.getElementById("miningStatus");
    if (active) {
      e.className = "mining-status active";
      e.innerHTML = '<div class="status-indicator"></div><span>Mining Active</span>';
    } else {
      e.className = "mining-status inactive";
      e.innerHTML = '<div class="status-indicator"></div><span>Mining Inactive</span>';
    }
  }

  function updateStatsUI(){
    const elapsed = Math.floor((Date.now() - startTime)/1000);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    const up = document.getElementById("uptime");
    if (up) up.textContent = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    addLog("CryptoTab-style Scala miner interface loaded", "info");
  });
})();


/* ========= WASM integration ========= */
(function attachWasmBindings(){
  if (typeof Module === "undefined") window.Module = {};
  const noop = () => 0;

  function safeCwrap(name, ret, args){
    try {
      if (typeof Module.cwrap === "function") {
        return Module.cwrap(name, ret, args);
      }
    } catch(e){ /* ignore */ }
    return noop;
  }

  // Bind (or stub) exports discovered in scala-miner.wat
  let _init = safeCwrap("init_panthera","number",[]);
  let _setJob_str = safeCwrap("set_scala_job","number",["string","string","string","string"]);
  let _setJob_num = safeCwrap("set_scala_job","number",["string","string","string","number"]);
  let _mineStep = safeCwrap("mine_step_background","number",[]);
  let _getNonce = safeCwrap("get_nonce","number",[]);
  let _setNonce = safeCwrap("set_nonce","void",["number"]);
  let _getHash = safeCwrap("get_current_hash","string",[]);
  let _getJobId = safeCwrap("get_current_job_id","string",[]);
  let _getDiff = safeCwrap("get_current_difficulty","number",[]);
  let _getHeight = safeCwrap("get_current_height","number",[]);
  let _setIntensity = safeCwrap("set_mining_intensity","void",["number"]);
  let _getIntensity = safeCwrap("get_mining_intensity","number",[]);

  Module.__xla = {
    init() {
      try {
        const ok = _init ? _init() : 0;
        addLog(ok ? "✅ WASM: init_panthera OK" : "⚠️ WASM: init_panthera missing/failed","info");
      } catch(e){
        addLog("❌ WASM init error: " + e.message, "error");
      }
    },
    setJob(job){
      // Accept either result.job (login) or params (notify)
      const blob = job.blob || "";
      const seed = job.seed_hash || "";
      const target = job.target || "";
      let rc = 0;
      try { rc = _setJob_str(blob, seed, target, "0"); } catch(e){}
      if (!rc) {
        try { rc = _setJob_num(blob, seed, target, 0); } catch(e){}
      }
      if (rc) {
        try {
          if (_setNonce) _setNonce(0);
          const jid = _getJobId ? _getJobId() : (job.job_id||"?");
          const h = _getHeight ? _getHeight() : (job.height||0);
          const d = _getDiff ? _getDiff() : (job.difficulty||0);
          if (h) document.getElementById("blockHeight").textContent = String(h);
          if (d) document.getElementById("difficulty").textContent = String(d);
          addLog("📥 Job set in WASM: " + jid, "success");
        } catch(e){
          addLog("⚠️ WASM setJob info error: " + e.message, "warning");
        }
      }
      return rc;
    },
    mineOnce(){
      try { return _mineStep ? _mineStep() : 0; } catch(e){ return 0; }
    },
    readShare(){
      try {
        const nonce = _getNonce ? _getNonce() >>> 0 : 0;
        const hash = _getHash ? _getHash() : "";
        return { nonce, hash };
      } catch(e){
        return { nonce: 0, hash: "" };
      }
    },
    setIntensity(pct){
      try { if (_setIntensity) _setIntensity(pct|0); } catch(e){}
    },
    getIntensity(){
      try { return _getIntensity ? _getIntensity()|0 : 0; } catch(e){ return 0; }
    }
  };

  // Initialize when runtime ready
  const prev = Module.onRuntimeInitialized;
  Module.onRuntimeInitialized = function(){
    if (typeof prev === "function") try { prev(); } catch(e){}
    Module.__xla.init();
  };
})();



// ---- WASM mining loop + helpers ----
let __wasmMiningTimer = null;

function startWasmMiningLoop(conn){
  stopWasmMiningLoop();
  // Optional: honor UI intensity
  const intensityEl = document.getElementById("intensitySlider");
  if (intensityEl && Module && Module.__xla) {
    const pct = parseInt(intensityEl.value,10) || 50;
    Module.__xla.setIntensity(pct);
  }
  addLog("⛏️ WASM mining loop started", "info");
  __wasmMiningTimer = setInterval(() => {
    // Run a few steps per tick to increase throughput
    let found = 0;
    for (let i=0;i<64;i++){
      const rc = Module && Module.__xla ? Module.__xla.mineOnce() : 0;
      if (rc) { found = 1; break; }
    }
    if (found){
      const {nonce, hash} = Module.__xla.readShare();
      if (nonce !== undefined && hash){
        const submitMsg = {
          id: conn.messageId++,
          jsonrpc:"2.0",
          method:"submit",
          params:{
            id: conn.workerId || (conn.currentJob && conn.currentJob.id),
            job_id: conn.currentJob && conn.currentJob.job_id,
            nonce: (nonce>>>0).toString(16).padStart(8,'0'),
            result: hash,
            algo: "panthera"
          }
        };
        conn.sendMessage(submitMsg);
        addLog("📤 Submitted share (WASM) nonce=" + submitMsg.params.nonce, "info");
      } else {
        addLog("⚠️ WASM indicated share but could not read hash/nonce", "warning");
      }
    }
  }, 30);
}

function stopWasmMiningLoop(){
  if (__wasmMiningTimer){
    clearInterval(__wasmMiningTimer);
    __wasmMiningTimer = null;
    addLog("🛑 WASM mining loop stopped", "info");
  }
}

function submitDummyShare(job){
  // Fallback: send a random nonce. Pools will mostly reject it; used to verify plumbing.
  const randomNonce = Math.floor(Math.random()*0xffffffff)>>>0;
  const fake = {
    id: this.messageId++,
    jsonrpc: "2.0",
    method: "submit",
    params: {
      id: job.id,
      job_id: job.job_id,
      nonce: randomNonce.toString(16).padStart(8,'0'),
      result: "0".repeat(64), // bogus
      algo: "panthera"
    }
  };
  this.sendMessage(fake);
  addLog("📤 Submitted dummy share for plumbing test", "warning");
}

