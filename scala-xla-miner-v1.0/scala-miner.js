/****************************************************
 * Scala (XLA) Miner Integration + UI Setup
 ****************************************************/

// Pool connector + CryptoTab-style manager (from earlier merge)
class ScalaPoolConnector {
    constructor() {
        this.websocket = null;
        this.isConnected = false;
        this.poolUrl = '';
        this.walletAddress = '';
        this.workerId = 'scala_webminer_' + Math.random().toString(36).substr(2, 9);
        this.currentJob = null;
        this.difficulty = 1000;
        this.onJobReceived = null;
        this.onConnected = null;
        this.onDisconnected = null;
        this.onError = null;
        this.messageId = 1;
        this.backgroundMining = false;
        this.miningIntensity = 50;
        this.autoReconnect = true;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect(poolUrl, walletAddress) {
        this.poolUrl = poolUrl;
        this.walletAddress = (walletAddress || "").trim();

        try {
            console.log(`Connecting to Scala pool: ${poolUrl}`);
            this.websocket = new WebSocket(poolUrl);

            this.websocket.onopen = () => {
                console.log("✅ Connected to pool:", poolUrl);
                this.isConnected = true;
                this.login();
                if (this.onConnected) this.onConnected();
            };

            this.websocket.onmessage = (event) => {
                this.handleMessage(JSON.parse(event.data));
            };

            this.websocket.onclose = () => {
                console.log("⚠️ Disconnected from pool");
                this.isConnected = false;
                if (this.onDisconnected) this.onDisconnected();
            };

            this.websocket.onerror = (err) => {
                console.error("❌ Pool error:", err);
                if (this.onError) this.onError(err);
            };
        } catch (err) {
            console.error("Connection failed:", err);
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
        console.log("📤 Sent login with wallet:", this.walletAddress);
    }

    handleMessage(msg) {
        if (msg.method === "job") {
            this.currentJob = msg.params;
            console.log("📥 New job:", this.currentJob.job_id);
            if (this.onJobReceived) this.onJobReceived(this.currentJob);
        } else if (msg.result?.status === "OK") {
            console.log("✅ Share accepted");
        } else if (msg.error) {
            console.error("❌ Pool error:", msg.error);
        }
    }

    sendMessage(msg) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify(msg));
        }
    }

    getCurrentJob() { return this.currentJob; }
    isPoolConnected() { return this.isConnected; }
}

const SCALA_POOLS = {
    herominers: { url: "wss://xla.herominers.com:1111" },
    fairpool: { url: "wss://xla.fairpool.xyz:3333" },
    demo: { url: "ws://localhost:8081" }
};

class CryptoTabStyleMiner {
    constructor() {
        this.poolConnector = new ScalaPoolConnector();
    }

    init(wallet, poolKey = "herominers") {
        const pool = SCALA_POOLS[poolKey];
        if (!pool) {
            console.error("Invalid pool");
            return;
        }

        this.poolConnector.onJobReceived = (job) => {
            console.log("⚡ Job set:", job.job_id);
            this.setScalaJob(job);
        };

        this.poolConnector.connect(pool.url, wallet);
    }

    startBackgroundMining() {
        console.log("🚀 Starting background mining…");
        setInterval(() => {
            if (typeof Module !== "undefined" && Module.ccall) {
                Module.ccall("mine_step_background", "number", ["number"], [500]);
            }
        }, 100);
    }

    setScalaJob(job) {
        if (typeof Module !== "undefined" && Module.ccall) {
            const blob = this.hexToBytes(job.blob);
            const target = this.hexToBytes(job.target);
            const blobPtr = Module._malloc(blob.length);
            const targetPtr = Module._malloc(target.length);

            Module.HEAPU8.set(blob, blobPtr);
            Module.HEAPU8.set(target, targetPtr);

            Module.ccall("set_scala_job", null,
                ["number", "number", "number", "number", "number", "string"],
                [blobPtr, blob.length, targetPtr, job.height || 0, job.difficulty || 1000, job.job_id]);

            Module._free(blobPtr);
            Module._free(targetPtr);
        }
    }

    hexToBytes(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }
}

/****************************************************
 * ✅ Hook for HTML buttons
 ****************************************************/
function setupMining() {
    const wallet = document.getElementById("walletInput").value.trim();
    const poolKey = document.getElementById("poolSelect").value || "herominers";

    if (!wallet) {
        alert("Please enter a wallet address!");
        return;
    }

    window.scalaMiner = new CryptoTabStyleMiner();
    window.scalaMiner.init(wallet, poolKey);
    window.scalaMiner.startBackgroundMining();

    console.log("🚀 Mining started with wallet:", wallet, "on pool:", poolKey);
}

/****************************************************
 * ⏹ Stop Mining Hook for UI
 ****************************************************/
function stopMining() {
    if (window.scalaMiner) {
        window.scalaMiner.poolConnector.disconnect();
        clearInterval(window.scalaMiner.miningInterval);
        clearInterval(window.scalaMiner.statsInterval);

        console.log("⏹ Mining stopped");
        alert("Mining stopped!");
    } else {
        console.warn("No miner instance found.");
    }
}