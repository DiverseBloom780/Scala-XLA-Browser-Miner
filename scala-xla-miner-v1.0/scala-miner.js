// ===============================
// Scala Miner - Main Mining Logic
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
      hashRate: 0
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
      hashRate: 0
    };
    window.__ui?.setPoolStatus?.("Disconnected");
  }

  setIntensity(value) {
    this.intensity = parseInt(value);
    console.log(`⚡ Intensity set: ${this.intensity}%`);
    window.__ui?.setIntensityLabel?.(this.intensity);
    window.__ui?.addLog?.(`⚙ Intensity set to ${this.intensity}%`, "info");
  }



  loop() {
    if (!this.mining) return;

    try {
      if (typeof Module === "undefined" || !Module.ccall) {
        console.warn("⚠️ WASM not ready, retrying...");
        setTimeout(() => this.loop(), 1000);
        return;
      }

      Module.ccall("mine_step_background", "void", [], []);
      this.minerState.totalHashes++;

      const hash = Module.ccall("get_current_hash", "string", [], []);
      const nonce = Module.ccall("get_nonce", "string", [], []);

      if (hash && this.poolConnector?.isConnectedToPool()) {
        const currentJob = this.poolConnector.getCurrentJob();
        if (currentJob && meetsTarget(hash, currentJob.target)) {
          if (this.poolConnector.submitResult(nonce, hash)) {
            this.minerState.sharesFound++;
            window.__ui?.setShares?.(this.minerState.sharesFound);
            console.log("✅ Valid share submitted");
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

function meetsTarget(hashHex, targetHex) {
  // Convert hex to BigInt (little-endian)
  const hashInt = BigInt("0x" + hashHex.match(/../g).reverse().join(""));
  const targetInt = BigInt("0x" + targetHex.match(/../g).reverse().join(""));
  return hashInt <= targetInt;
}

// ===============================
// Scala Pool Connector (full version merged)
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
          console.log("[POOL] Received message:", data);

          if (data.id === 1 && data.result?.id) {
            this.loginId = data.result.id;
            console.log("🔑 Logged in successfully, id:", this.loginId);
            if (data.result.job) this.handleJob(data.result.job);
          }

          if (data.method === "job" || data.result?.job) {
            const job = data.method === "job" ? data.params : data.result.job;
            this.handleJob(job);
          }

          if (data.id === 2) {
            if (data.result?.status === "OK") {
              console.log("✅ Share accepted by pool");
              window.addLog?.("✅ Share accepted by pool", "success");
            } else if (data.error) {
              console.warn("❌ Pool error:", data.error);
              window.addLog?.(`❌ Pool error: ${data.error.message || data.error}`, "error");
            }
          }

          if (data.error && data.id !== 2) {
            console.warn("⚠️ Pool error:", data.error);
            window.addLog?.(`⚠️ Pool error: ${data.error.message || data.error}`, "error");
          }
        } catch (e) {
          console.error("Error parsing pool message:", e);
        }
      };

      this.socket.onerror = (err) => {
        console.error("⚠️ Socket error:", err);
        this.isConnected = false;
        window.__ui?.setPoolStatus?.("Error");
        window.addLog?.("⚠️ Pool connection error", "error");
      };

      this.socket.onclose = (event) => {
        console.warn("⚠️ Disconnected from pool (code:", event.code, ")");
        this.isConnected = false;
        this.loginId = null;
        window.__ui?.setPoolStatus?.("Disconnected");
        window.addLog?.("⚠️ Disconnected from pool, retrying in 5s...", "warning");
        this.reconnectTimeout = setTimeout(() => {
          console.log("[POOL] Attempting to reconnect...");
          window.__ui?.setPoolStatus?.("Reconnecting...");
          this.connect();
        }, 5000);
      };

    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      window.addLog?.(`Failed to connect to pool: ${error.message}`, "error");
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
    window.addLog?.("✅ Disconnected from pool", "info");
  }

  handleJob(job) {
    console.log("🔥 New job received:", job.job_id);
    console.log("🎯 Job target:", job.target);
    this.job = job;
    window.addLog?.(`🔥 New job: ${job.job_id}`, "info");

    try {
      if (typeof Module !== 'undefined' && Module.ccall) {
        Module.ccall("set_scala_job", "void", ["string", "string", "string"], [job.blob, job.job_id, job.target]);
        console.log("✅ Job sent to WASM miner");
      } else {
        console.warn("⚠️ WASM Module not available, cannot set job");
      }
    } catch (e) {
      console.error("❌ Error setting job in WASM:", e);
      window.addLog?.(`❌ Error setting job: ${e.message}`, "error");
    }
  }

  submitResult(nonce, resultHash) {
    if (!this.job) {
      console.warn("⚠️ No job available for result submission");
      return false;
    }
    if (!this.loginId) {
      console.warn("⚠️ Not logged in to pool");
      return false;
    }

    console.log("📤 Submitting result:", resultHash.substring(0, 16) + "...");
    window.addLog?.(`📤 Submitting share: ${resultHash.substring(0, 16)}...`, "info");

    try {
      this.send({
        id: 2,
        method: "submit",
        params: { id: this.loginId, job_id: this.job.job_id, nonce, result: resultHash }
      });
      return true;
    } catch (error) {
      console.error("❌ Error submitting result:", error);
      window.addLog?.(`❌ Submit error: ${error.message}`, "error");
      return false;
    }
  }

  send(obj) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(obj));
        console.log("[POOL] Sent:", obj.method || `id:${obj.id}`);
      } catch (error) {
        console.error("❌ Error sending to pool:", error);
      }
    } else {
      console.warn("⚠️ Cannot send - socket not connected");
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

console.log("✅ ScalaMiner + ScalaPoolConnector merged and loaded");
// Ensure miner only starts once WASM is ready
if (typeof window !== "undefined") {
  window.Module = window.Module || {};
  window.Module.onRuntimeInitialized = () => {
    console.log("🎉 WASM is ready, you can safely start mining now.");
    // Auto-start mining if already configured
    if (window.scalaMiner?.minerState?.wallet && window.scalaMiner?.minerState?.pool) {
      console.log("🚀 Auto-starting miner after WASM init...");
      window.scalaMiner.startMining();
    }
  };
}
