// ===============================
// Scala Miner - Main Mining Logic (FIXED)
// ===============================

class ScalaMiner {
  constructor() {
    this.mining = false;
    this.poolConnector = null;
    this.intensity = 50; // Default intensity 50%
    this.minerState = {
      wallet: null,
      pool: null,
      startTime: null,
      totalHashes: 0,
      sharesFound: 0,
      hashRate: 0,
      nonceCounter: 0 // Add nonce counter for proper incrementing
    };

    console.log("🔧 ScalaMiner instance created");
  }

  setupPoolEventHandlers() {
    if (!this.poolConnector) return;

    const originalConnect = this.poolConnector.connect.bind(this.poolConnector);

    this.poolConnector.connect = () => {
      originalConnect();
      const checkSocket = () => {
        if (this.poolConnector.socket) {
          this.hookSocketEvents();
        } else {
          setTimeout(checkSocket, 100);
        }
      };
      checkSocket();
    };
  }

  hookSocketEvents() {
    const socket = this.poolConnector.socket;
    if (!socket) return;

    const originalOnOpen = socket.onopen;
    const originalOnClose = socket.onclose;
    const originalOnError = socket.onerror;

    socket.onopen = (event) => {
      if (originalOnOpen) originalOnOpen.call(socket, event);
      window.__ui?.setPoolStatus?.("Connected");
    };

    socket.onclose = (event) => {
      if (originalOnClose) originalOnClose.call(socket, event);
      window.__ui?.setPoolStatus?.("Disconnected");
    };

    socket.onerror = (event) => {
      if (originalOnError) originalOnError.call(socket, event);
      window.__ui?.setPoolStatus?.("Error");
    };
  }

  setupFromUI(wallet, poolName) {
    try {
      console.log(`⚙️ Setting up miner with wallet: ${wallet?.substring(0, 10)}... pool: ${poolName}`);
      if (!wallet || !poolName) {
        console.error("❌ Invalid wallet or pool name");
        window.__ui?.addLog?.("❌ Invalid wallet or pool configuration", "error");
        return false;
      }

      this.minerState.wallet = wallet;
      this.minerState.pool = poolName;
      this.minerState.nonceCounter = 0; // Reset nonce counter

      this.poolConnector = new ScalaPoolConnector(wallet, poolName);
      this.setupPoolEventHandlers();
      this.poolConnector.connect();

      window.__ui?.addLog?.(`✅ Miner configured for pool: ${poolName}`, "success");
      window.__ui?.addLog?.(`💼 Using wallet: ${wallet.substring(0, 10)}...${wallet.slice(-10)}`, "info");
      window.__ui?.setPoolStatus?.("Connecting...");

      setTimeout(() => {
        if (this.poolConnector?.isConnectedToPool()) {
          this.startMining();
          window.__ui?.setPoolStatus?.("Connected");
        }
      }, 2000);

      return true;
    } catch (e) {
      console.error("❌ Setup error:", e);
      window.__ui?.addLog?.(`❌ Setup error: ${e.message}`, "error");
      return false;
    }
  }

  startMining() {
    if (this.mining) {
      console.log("⚠️ Already mining");
      return;
    }

    console.log("🚀 Starting mining...");
    this.mining = true;
    this.minerState.startTime = Date.now();
    this.minerState.nonceCounter = 0; // Reset nonce counter

    window.__ui?.setStatus?.(true);
    window.__ui?.addLog?.("🚀 Mining started", "success");

    this.loop();
    this.startUIUpdates();
  }

  stopMining() {
    console.log("⏹ Stopping mining...");
    this.mining = false;
    window.__ui?.setStatus?.(false);
    window.__ui?.addLog?.("⏹ Mining stopped", "info");
  }

  stop() {
    this.stopMining();
    if (this.poolConnector) {
      this.poolConnector.disconnect();
      this.poolConnector = null;
    }
    this.minerState = {
      wallet: null,
      pool: null,
      startTime: null,
      totalHashes: 0,
      sharesFound: 0,
      hashRate: 0,
      nonceCounter: 0
    };
    window.__ui?.setPoolStatus?.("Disconnected");
  }

  setIntensity(value) {
    this.intensity = parseInt(value);
    console.log(`⚡ Intensity set: ${this.intensity}%`);
    window.__ui?.setIntensityLabel?.(this.intensity);
    window.__ui?.addLog?.(`⚙ Intensity set to ${this.intensity}%`, "info");
  }

  // FIXED: Proper nonce formatting for Scala/Cryptonote
  formatNonce(nonce) {
    // Convert nonce to 32-bit little-endian hex string (8 chars, zero-padded)
    let nonceInt = parseInt(nonce) || this.minerState.nonceCounter;
    
    // Ensure it's within 32-bit range
    nonceInt = nonceInt & 0xFFFFFFFF;
    
    // Convert to little-endian 4-byte hex string
    const bytes = [
      (nonceInt & 0xFF),
      (nonceInt >> 8) & 0xFF,
      (nonceInt >> 16) & 0xFF,
      (nonceInt >> 24) & 0xFF
    ];
    
    const nonceHex = bytes.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(`🔢 Formatted nonce: ${nonceInt} -> ${nonceHex} (little-endian)`);
    return nonceHex;
  }

  // FIXED: Proper hash formatting for pool submission
  formatResultHash(hash) {
    // Hash should be submitted as big-endian hex (not reversed)
    // Remove any 0x prefix and ensure lowercase
    let cleanHash = hash.replace(/^0x/, '').toLowerCase();
    
    // Ensure it's 64 characters (32 bytes)
    if (cleanHash.length !== 64) {
      console.warn(`⚠️ Hash length incorrect: ${cleanHash.length}, expected 64`);
    }
    
    console.log(`🔍 Formatted result hash: ${cleanHash}`);
    return cleanHash;
  }

  loop() {
    if (!this.mining) return;

    try {
      if (typeof Module === "undefined" || !Module.ccall) {
        console.warn("⚠️ WASM not ready, retrying...");
        setTimeout(() => this.loop(), 1000);
        return;
      }

      // Increment nonce counter for proper nonce generation
      this.minerState.nonceCounter++;
      
      Module.ccall("mine_step_background", "void", [], []);
      this.minerState.totalHashes++;

      const hash = Module.ccall("get_current_hash", "string", [], []);
      const rawNonce = Module.ccall("get_nonce", "string", [], []) || this.minerState.nonceCounter;

      if (hash && this.poolConnector?.isConnectedToPool()) {
        const currentJob = this.poolConnector.getCurrentJob();
        if (currentJob && this.meetsTarget(hash, currentJob.target)) {
          console.log("🎯 Found potential share!");
          
          // Format nonce and hash properly for Scala
          const formattedNonce = this.formatNonce(rawNonce);
          const formattedHash = this.formatResultHash(hash);
          
          if (this.poolConnector.submitResult(formattedNonce, formattedHash)) {
            this.minerState.sharesFound++;
            window.__ui?.setShares?.(this.minerState.sharesFound);
            console.log("✅ Valid share submitted to pool");
            window.__ui?.addLog?.(`✅ Share submitted! Total: ${this.minerState.sharesFound}`, "success");
          }
        }
      }
    } catch (e) {
      console.error("❌ Loop error:", e);
      window.__ui?.addLog?.(`❌ Mining error: ${e.message}`, "error");
    }

    const delay = Math.max(100, 2100 - (this.intensity * 20));
    setTimeout(() => this.loop(), delay);
  }

  // FIXED: Proper target comparison for Scala/Cryptonote
  meetsTarget(hashHex, targetHex) {
    try {
      // Remove 0x prefix if present
      const cleanHash = hashHex.replace(/^0x/, '');
      const cleanTarget = targetHex.replace(/^0x/, '');
      
      // For Cryptonote/Scala, we need to compare as big-endian
      // Convert hex strings to BigInt for proper comparison
      const hashBig = BigInt("0x" + cleanHash);
      const targetBig = BigInt("0x" + cleanTarget);
      
      const meets = hashBig <= targetBig;
      
      if (meets) {
        console.log(`🎯 TARGET MET! Hash: ${cleanHash.substring(0, 16)}... <= Target: ${cleanTarget.substring(0, 16)}...`);
      }
      
      return meets;
    } catch (e) {
      console.error("❌ Target comparison error:", e);
      return false;
    }
  }

  startUIUpdates() {
    const updateUI = () => {
      if (!this.mining) return;

      const runtime = this.minerState.startTime
        ? Math.floor((Date.now() - this.minerState.startTime) / 1000)
        : 0;

      const hashRate = runtime > 0
        ? Math.floor(this.minerState.totalHashes / runtime)
        : 0;

      this.minerState.hashRate = hashRate;

      window.__ui?.setHashrate?.(hashRate);
      window.__ui?.setTotalHashes?.(this.minerState.totalHashes);
      window.__ui?.setShares?.(this.minerState.sharesFound);
      window.__ui?.setUptime?.(runtime);

      setTimeout(updateUI, 2000);
    };

    updateUI();
  }

  isActive() {
    return this.mining;
  }

  getStats() {
    return {
      mining: this.mining,
      intensity: this.intensity,
      ...this.minerState
    };
  }
}

// ===============================
// Scala Pool Connector (FIXED)
// ===============================

class ScalaPoolConnector {
  constructor(wallet, poolName) {
    this.wallet = wallet;
    this.poolName = poolName || "scalaproject_low";
    this.socket = null;
    this.loginId = null;
    this.job = null;
    this.isConnected = false;
    this.reconnectTimeout = null;
    
    console.log(`[POOL] ScalaPoolConnector initialized with wallet: ${wallet?.substring(0, 10)}... and pool: ${poolName}`);
  }

  connect() {
    const url = `ws://localhost:8080?pool=${this.poolName}`;
    console.log(`[POOL] Connecting to ${url} with wallet ${this.wallet?.substring(0, 10)}...`);

    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("✅ Connected to Scala pool");
        this.isConnected = true;
        window.__ui?.setPoolStatus?.("Connected");
        this.send({
          id: 1,
          method: "login",
          params: { login: this.wallet, pass: "x", agent: "ScalaWebMiner/1.0" }
        });
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("[POOL] ⬇️ Received message:", data);

          if (data.id === 1 && data.result?.id) {
            this.loginId = data.result.id;
            console.log("🔑 Logged in successfully, id:", this.loginId);
            if (data.result.job) this.handleJob(data.result.job);
          }

          if (data.method === "job" || data.result?.job) {
            const job = data.method === "job" ? data.params : data.result.job;
            this.handleJob(job);
          }

          // FIXED: Better share result handling with detailed logging
          if (data.id === 2) {
            console.log("[POOL] 📥 Share submission response:", JSON.stringify(data, null, 2));
            
            if (data.result?.status === "OK") {
              console.log("✅ SHARE ACCEPTED BY POOL!");
              window.__ui?.addLog?.("✅ Share accepted by pool", "success");
            } else if (data.error) {
              console.warn("❌ SHARE REJECTED:", data.error);
              window.__ui?.addLog?.(`❌ Share rejected: ${data.error.message || JSON.stringify(data.error)}`, "error");
            } else {
              console.log("📝 Share response (unknown format):", data);
            }
          }

          if (data.error && data.id !== 2) {
            console.warn("⚠️ Pool error:", data.error);
            window.__ui?.addLog?.(`⚠️ Pool error: ${data.error.message || JSON.stringify(data.error)}`, "error");
          }
        } catch (e) {
          console.error("Error parsing pool message:", e);
          console.log("Raw message:", event.data);
        }
      };

      this.socket.onerror = (err) => {
        console.error("⚠️ Socket error:", err);
        this.isConnected = false;
        window.__ui?.setPoolStatus?.("Error");
        window.__ui?.addLog?.("⚠️ Pool connection error", "error");
      };

      this.socket.onclose = (event) => {
        console.warn("⚠️ Disconnected from pool (code:", event.code, ")");
        this.isConnected = false;
        this.loginId = null;
        window.__ui?.setPoolStatus?.("Disconnected");
        window.__ui?.addLog?.("⚠️ Disconnected from pool, retrying in 5s...", "warning");
        this.reconnectTimeout = setTimeout(() => {
          console.log("[POOL] Attempting to reconnect...");
          window.__ui?.setPoolStatus?.("Reconnecting...");
          this.connect();
        }, 5000);
      };

    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      window.__ui?.addLog?.(`Failed to connect to pool: ${error.message}`, "error");
    }
  }

  disconnect() {
    console.log("[POOL] Disconnecting from pool...");
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.socket) this.socket.close();
    this.isConnected = false;
    this.loginId = null;
    this.job = null;
    console.log("✅ Disconnected from pool");
    window.__ui?.addLog?.("✅ Disconnected from pool", "info");
  }

  handleJob(job) {
    console.log("🔥 New job received:", job.job_id);
    console.log("🎯 Job target:", job.target);
    console.log("📦 Job blob length:", job.blob?.length);
    
    this.job = job;
    
    // Calculate and display difficulty
    try {
      const targetBig = BigInt("0x" + job.target);
      const maxTarget = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
      const difficulty = Number(maxTarget / targetBig);
      window.__ui?.addLog?.(`🔥 New job: ${job.job_id} (diff: ${Math.floor(difficulty).toLocaleString()})`, "info");
      
      // Update UI with job info
      const diffEl = document.getElementById('difficulty');
      const heightEl = document.getElementById('blockHeight');
      if (diffEl) diffEl.textContent = Math.floor(difficulty).toLocaleString();
      if (heightEl) heightEl.textContent = job.height || 'Unknown';
    } catch (e) {
      window.__ui?.addLog?.(`🔥 New job: ${job.job_id}`, "info");
    }

    try {
      if (typeof Module !== 'undefined' && Module.ccall) {
        Module.ccall("set_scala_job", "void", ["string", "string", "string"], [job.blob, job.job_id, job.target]);
        console.log("✅ Job sent to WASM miner");
      } else {
        console.warn("⚠️ WASM Module not available, cannot set job");
      }
    } catch (e) {
      console.error("❌ Error setting job in WASM:", e);
      window.__ui?.addLog?.(`❌ Error setting job: ${e.message}`, "error");
    }
  }

  // FIXED: Enhanced submitResult with detailed logging and proper formatting
  submitResult(nonce, resultHash) {
    if (!this.job) {
      console.warn("⚠️ No job available for result submission");
      window.__ui?.addLog?.("⚠️ No job available for submission", "warning");
      return false;
    }
    if (!this.loginId) {
      console.warn("⚠️ Not logged in to pool");
      window.__ui?.addLog?.("⚠️ Not logged in to pool", "warning");
      return false;
    }

    // Create the submission payload
    const payload = {
      id: 2,
      method: "submit",
      params: { 
        id: this.loginId, 
        job_id: this.job.job_id, 
        nonce: nonce, 
        result: resultHash 
      }
    };

    console.log("📤 SUBMITTING SHARE TO POOL:");
    console.log("   Job ID:", this.job.job_id);
    console.log("   Nonce:", nonce, "(length:", nonce.length, ")");
    console.log("   Result:", resultHash, "(length:", resultHash.length, ")");
    console.log("   Login ID:", this.loginId);
    console.log("   Full payload:", JSON.stringify(payload, null, 2));
    
    window.__ui?.addLog?.(`📤 Submitting share: ${resultHash.substring(0, 16)}... (nonce: ${nonce})`, "info");

    try {
      this.send(payload);
      return true;
    } catch (error) {
      console.error("❌ Error submitting result:", error);
      window.__ui?.addLog?.(`❌ Submit error: ${error.message}`, "error");
      return false;
    }
  }

  send(obj) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        const jsonStr = JSON.stringify(obj);
        console.log("[POOL] ⬆️ Sending to pool:", jsonStr);
        this.socket.send(jsonStr);
      } catch (error) {
        console.error("❌ Error sending to pool:", error);
        window.__ui?.addLog?.(`❌ Send error: ${error.message}`, "error");
      }
    } else {
      console.warn("⚠️ Cannot send - socket not connected");
      window.__ui?.addLog?.("⚠️ Cannot send - socket not connected", "warning");
    }
  }

  isConnectedToPool() {
    return this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN;
  }

  getCurrentJob() {
    return this.job;
  }

  getLoginId() {
    return this.loginId;
  }
}

// ===============================
// Expose miner globally
// ===============================

window.scalaMiner = new ScalaMiner();
window.setupMining = () => window.scalaMiner.setupFromUI(
  document.getElementById("walletAddress")?.value?.trim(),
  document.getElementById("poolSelect")?.value
);
window.startMining = () => window.scalaMiner.startMining();
window.stopMining = () => window.scalaMiner.stop();
window.updateIntensity = (v) => window.scalaMiner.setIntensity(v);

console.log("✅ ScalaMiner + ScalaPoolConnector FIXED and loaded");

// Ensure miner only starts once WASM is ready
if (typeof window !== "undefined") {
  window.Module = window.Module || {};
  window.Module.onRuntimeInitialized = () => {
    console.log("🎉 WASM is ready, you can safely start mining now.");
    window.__ui?.addLog?.("🎉 WASM runtime initialized", "success");
    
    // Auto-start mining if already configured
    if (window.scalaMiner?.minerState?.wallet && window.scalaMiner?.minerState?.pool) {
      console.log("🚀 Auto-starting miner after WASM init...");
      window.scalaMiner.startMining();
    }
  };
}