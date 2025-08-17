/****************************************************
 * Scala XLA WebAssembly Miner (CryptoTab-Style)
 ****************************************************/

// ---------- Log helper ----------
function addLog(message, type = "info") {
  const log = document.getElementById("miningLog");
  if (!log) return;
  const time = new Date().toLocaleTimeString();
  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${time}] ${message}`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
  if (log.children.length > 400) log.removeChild(log.firstChild);
}

// ---------- ScalaPoolConnector ----------
class ScalaPoolConnector {
  constructor() {
    this.websocket = null;
    this.isConnected = false;
    this.poolUrl = "";
    this.walletAddress = "";
    this.workerId = "scala_webminer_" + Math.random().toString(36).substr(2, 9);
    this.currentJob = null;
    this.difficulty = 1000;
    this.onJobReceived = null;
    this.onConnected = null;
    this.onDisconnected = null;
    this.onError = null;
    this.messageId = 1;
  }

  connect(poolUrl, walletAddress) {
    this.poolUrl = poolUrl;
    this.walletAddress = (walletAddress || "").trim();

    try {
      addLog(`Connecting to pool: ${poolUrl}`, "info");
      this.websocket = new WebSocket(poolUrl);

      this.websocket.onopen = () => {
        this.isConnected = true;
        addLog("✅ Connected to Scala pool", "success");
        this.login();
        this.onConnected && this.onConnected();
      };

      this.websocket.onmessage = (event) => {
        let msg;
        try { msg = JSON.parse(event.data); }
        catch { return addLog("Non-JSON pool message received", "warning"); }
        this.handleMessage(msg);
      };

      this.websocket.onclose = () => {
        this.isConnected = false;
        addLog("⚠️ Disconnected from Scala pool", "warning");
        this.onDisconnected && this.onDisconnected();
      };

      this.websocket.onerror = (error) => {
        addLog("❌ Scala pool WebSocket error: " + (error?.message || String(error)), "error");
        this.onError && this.onError(error);
      };
    } catch (error) {
      addLog("Failed to connect: " + error, "error");
      this.onError && this.onError(error);
    }
  }

  login() {
    if (!this.isConnected) return;

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
    addLog(`🔑 Sent login request with worker ${this.workerId}`, "info");
  }

  handleMessage(message) {
    if (message.method === "job" && message.params) {
      this.currentJob = message.params;
      addLog("📥 Job received: " + (this.currentJob.job_id || "?"), "success");
      this.onJobReceived && this.onJobReceived(this.currentJob);
      return;
    }

    if (message.result) {
      const st = message.result.status || "";
      if (st.toUpperCase() === "OK") {
        addLog("✅ Share accepted by pool", "success");
      } else {
        addLog("ℹ️ Pool result: " + JSON.stringify(message.result), "info");
      }
      return;
    }

    if (message.error) {
      addLog("❌ Pool error: " + JSON.stringify(message.error), "error");
      return;
    }

    addLog("ℹ️ Pool message: " + JSON.stringify(message), "info");
  }

  sendMessage(message) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      addLog("WebSocket not ready", "error");
    }
  }

  disconnect() {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    this.isConnected = false;
    this.currentJob = null;
  }
}

// ---------- Pools ----------
const SCALA_POOLS = {
  herominers: { name: "HeroMiners (via proxy)", url: "ws://localhost:8080?pool=herominers" },
  fairpool:   { name: "FairPool (via proxy)",   url: "ws://localhost:8080?pool=fairpool" },
  poolmine:   { name: "PoolMine (via proxy)",   url: "ws://localhost:8080?pool=poolmine" },
  scalaproject_low:  { name: "ScalaProject Props Low (diff 10k)",   url: "ws://localhost:8080?pool=scalaproject_low" },
  scalaproject_mid:  { name: "ScalaProject Props Mid (diff 100k)", url: "ws://localhost:8080?pool=scalaproject_mid" },
  scalaproject_high: { name: "ScalaProject Props High (diff 5M)",  url: "ws://localhost:8080?pool=scalaproject_high" },
  scalaproject_solo: { name: "ScalaProject Solo Miner",            url: "ws://localhost:8080?pool=scalaproject_solo" }
};

// ---------- Global miner ----------
window.scalaMiner = {
  poolConnector: null,
  miningInterval: null,
  statsInterval: null,
  stats: {
    hashRate: 0,
    totalHashes: 0,
    sharesFound: 0,
    startTime: null
  }
};

// ---------- Setup Mining ----------
function setupMining() {
  const wallet = document.getElementById("walletAddress").value.trim();
  const pool = document.getElementById("poolSelect").value;

  if (!wallet) return addLog("❌ Please enter a Scala (XLA) wallet address", "error");
  if (!pool) return addLog("❌ Please select a mining pool", "error");

  if (wallet.length < 90 || wallet.length > 106) {
    addLog(`⚠️ Wallet address looks unusual (length ${wallet.length})`, "warning");
  }

  addLog(`🔗 Connecting to ${pool} pool with wallet: ${wallet}`, "info");
  document.getElementById("poolStatus").textContent = "Connecting";

  window.scalaMiner.poolConnector = new ScalaPoolConnector();

  scalaMiner.poolConnector.onConnected = () => {
    document.getElementById("poolStatus").textContent = "Connected";
    updateMiningStatus(true);
    startMining();
  };

  scalaMiner.poolConnector.onDisconnected = () => {
    document.getElementById("poolStatus").textContent = "Disconnected";
    updateMiningStatus(false);
  };

  scalaMiner.poolConnector.onError = (e) => {
    document.getElementById("poolStatus").textContent = "Error";
  };

  scalaMiner.poolConnector.onJobReceived = (job) => {
    if (job.difficulty) document.getElementById("difficulty").textContent = job.difficulty;
    if (job.height) document.getElementById("blockHeight").textContent = job.height;
  };

  const poolConfig = SCALA_POOLS[pool];
  if (!poolConfig) return addLog("❌ Invalid pool config", "error");
  scalaMiner.poolConnector.connect(poolConfig.url, wallet);
}

// ---------- Start Mining ----------
function startMining() {
  if (!scalaMiner.poolConnector || !scalaMiner.poolConnector.isConnected) {
    return addLog("❌ Cannot start mining: not connected", "error");
  }

  scalaMiner.stats.startTime = Date.now();

  // fake hash updates for now
  scalaMiner.miningInterval = setInterval(() => {
    scalaMiner.stats.hashRate = (Math.random() * 100).toFixed(2);
    scalaMiner.stats.totalHashes += Math.floor(Math.random() * 50);

    document.getElementById("hashRate").textContent = scalaMiner.stats.hashRate;
    document.getElementById("totalHashes").textContent = scalaMiner.stats.totalHashes;
  }, 2000);

  scalaMiner.statsInterval = setInterval(updateMiningStats, 1000);

  addLog("🚀 Mining started", "success");
  updateMiningStatus(true);
}

// ---------- Stop Mining ----------
function stopMining() {
  if (scalaMiner.poolConnector) {
    scalaMiner.poolConnector.disconnect();
  }
  if (scalaMiner.miningInterval) clearInterval(scalaMiner.miningInterval);
  if (scalaMiner.statsInterval) clearInterval(scalaMiner.statsInterval);

  addLog("⏹ Mining stopped", "warning");
  updateMiningStatus(false);
}

// ---------- Update mining status ----------
function updateMiningStatus(active) {
  const statusEl = document.getElementById("miningStatus");
  if (active) {
    statusEl.className = "mining-status active";
    statusEl.innerHTML = '<div class="status-indicator"></div><span>Mining Active</span>';
  } else {
    statusEl.className = "mining-status inactive";
    statusEl.innerHTML = '<div class="status-indicator"></div><span>Mining Inactive</span>';
  }
}

// ---------- Update uptime ----------
function updateMiningStats() {
  const now = Date.now();
  const elapsed = Math.floor((now - scalaMiner.stats.startTime) / 1000);
  const h = Math.floor(elapsed / 3600),
        m = Math.floor((elapsed % 3600) / 60),
        s = elapsed % 60;
  document.getElementById("uptime").textContent =
    `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}
