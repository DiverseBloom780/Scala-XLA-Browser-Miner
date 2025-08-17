/**
 * Scala (XLA) Mining Pool Connector
 * CryptoTab Browser-style background mining implementation
 */

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

    // Connect to Scala mining pool
    connect(poolUrl, walletAddress) {
        this.poolUrl = poolUrl;
        this.walletAddress = (walletAddress || "").trim();

        try {
            console.log(`Connecting to Scala pool: ${poolUrl}`);
            this.websocket = new WebSocket(poolUrl);

            this.websocket.onopen = () => {
                console.log('Connected to Scala mining pool:', poolUrl);
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.login();
                if (this.onConnected) this.onConnected();
            };

            this.websocket.onmessage = (event) => {
                this.handleMessage(JSON.parse(event.data));
            };

            this.websocket.onclose = () => {
                console.log('Disconnected from Scala mining pool');
                this.isConnected = false;
                if (this.onDisconnected) this.onDisconnected();

                if (this.autoReconnect && this.backgroundMining && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.reconnectAttempts++;
                    console.log(`Auto-reconnecting to pool (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
                    setTimeout(() => this.connect(this.poolUrl, this.walletAddress), 5000);
                }
            };

            this.websocket.onerror = (error) => {
                console.error('Scala pool WebSocket error:', error);
                if (this.onError) this.onError(error);
            };

        } catch (error) {
            console.error('Failed to connect to Scala pool:', error);
            if (this.onError) this.onError(error);
        }
    }

    // 🔹 Login to Scala pool (relaxed validation)
    login() {
        if (!this.isConnected) return;

        if (!this.walletAddress || this.walletAddress.length < 60) {
            console.warn("⚠️ Wallet address looks unusual:", this.walletAddress);
            if (typeof addLog === "function") {
                addLog("⚠️ Wallet address looks unusual, continuing anyway...", "warning");
            }
        }

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
        console.log("✅ Sent login request to pool with wallet:", this.walletAddress, "worker:", this.workerId);
    }

    // 🔹 Handle incoming messages from the pool
    handleMessage(message) {
        if (message.method === "job") {
            this.currentJob = message.params;
            console.log("📥 New job received from pool:", this.currentJob.job_id);
            if (typeof addLog === "function") addLog("📥 New job received from pool", "success");

            // Pass job to WASM miner
            if (typeof Module !== "undefined" && Module.ccall) {
                try {
                    const blob = this.hexToBytes(this.currentJob.blob);
                    const target = this.hexToBytes(this.currentJob.target);
                    const height = this.currentJob.height || 0;
                    const difficulty = this.currentJob.difficulty || 1000;
                    const jobId = this.currentJob.job_id;

                    const blobPtr = Module._malloc(blob.length);
                    const targetPtr = Module._malloc(target.length);
                    Module.HEAPU8.set(blob, blobPtr);
                    Module.HEAPU8.set(target, targetPtr);

                    Module.ccall("set_scala_job", null,
                        ["number","number","number","number","number","string"],
                        [blobPtr, blob.length, targetPtr, height, difficulty, jobId]);

                    Module._free(blobPtr);
                    Module._free(targetPtr);

                    if (typeof addLog === "function") addLog("✅ Job passed to WebAssembly miner", "info");
                } catch (e) {
                    console.error("Failed to set job in miner:", e);
                }
            }

            if (this.onJobReceived) this.onJobReceived(this.currentJob);

        } else if (message.result && message.result.status === "OK") {
            console.log("✅ Share accepted by pool");
            if (typeof addLog === "function") addLog("✅ Share accepted by pool", "success");

        } else if (message.error) {
            console.error("❌ Pool error:", message.error);
            if (typeof addLog === "function") addLog("❌ Pool error: " + message.error.message, "error");
        }
    }

    // Submit Scala mining result (share) to pool
    submitShare(jobId, nonce, result) {
        if (!this.isConnected) {
            console.error('Not connected to Scala pool');
            return false;
        }

        const submitMessage = {
            id: this.messageId++,
            jsonrpc: "2.0",
            method: "submit",
            params: {
                id: this.workerId,
                job_id: jobId,
                nonce: nonce.toString(16).padStart(8, '0'),
                result: result,
                algo: "panthera"
            }
        };

        this.sendMessage(submitMessage);
        if (typeof addLog === "function") addLog("📤 Share submitted to pool", "info");
        return true;
    }

    setBackgroundMining(enabled) {
        this.backgroundMining = enabled;
        console.log(`Background mining ${enabled ? 'enabled' : 'disabled'}`);
        if (enabled && !this.isConnected && this.poolUrl && this.walletAddress) {
            this.connect(this.poolUrl, this.walletAddress);
        }
    }

    setMiningIntensity(intensity) {
        if (intensity >= 0 && intensity <= 100) {
            this.miningIntensity = intensity;
            console.log(`Mining intensity set to ${intensity}%`);
            return true;
        }
        return false;
    }

    getMiningIntensity() {
        return this.miningIntensity;
    }

    sendMessage(message) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket not ready for sending');
        }
    }

    disconnect() {
        this.autoReconnect = false;
        if (this.websocket) {
            this.websocket.close();
            this.websocket = null;
        }
        this.isConnected = false;
        this.currentJob = null;
    }

    getCurrentJob() {
        return this.currentJob;
    }

    isPoolConnected() {
        return this.isConnected;
    }

    getStats() {
        return {
            connected: this.isConnected,
            poolUrl: this.poolUrl,
            workerId: this.workerId,
            backgroundMining: this.backgroundMining,
            intensity: this.miningIntensity,
            reconnectAttempts: this.reconnectAttempts,
            currentJob: this.currentJob ? this.currentJob.job_id : null
        };
    }

    // 🔹 helper for job hex parsing
    hexToBytes(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }
}

// Scala (XLA) pool configurations
const SCALA_POOLS = {
    'herominers': { name: 'HeroMiners XLA', url: 'wss://xla.herominers.com:1111', fee: '0.9%', location: 'Global' },
    'fairpool':  { name: 'FairPool XLA', url: 'wss://xla.fairpool.xyz:3333', fee: '0.6%', location: 'Europe' },
    'poolmine':  { name: 'PoolMine XLA', url: 'wss://xla.poolmine.tk:4444', fee: '1.0%', location: 'Asia' },
    'demo':      { name: 'Demo Pool', url: 'ws://localhost:8081', fee: '0%', location: 'Local' }
};

// CryptoTab-style mining manager
class CryptoTabStyleMiner {
    constructor() {
        this.poolConnector = new ScalaPoolConnector();
        this.miningInterval = null;
        this.statsInterval = null;
        this.isBackgroundMining = false;
        this.totalEarnings = 0;
        this.sessionHashes = 0;
        this.startTime = null;
    }

    init(walletAddress, poolKey = 'herominers') {
        const pool = SCALA_POOLS[poolKey];
        if (!pool) return false;

        this.poolConnector.onConnected = () => {
            console.log('CryptoTab-style mining ready');
            if (this.isBackgroundMining) this.startBackgroundMining();
        };

        this.poolConnector.onJobReceived = (job) => {
            console.log('New Scala job for background mining');
            this.setScalaJob(job);
        };

        this.poolConnector.connect(pool.url, walletAddress);
        return true;
    }

    startBackgroundMining() {
        if (this.miningInterval) return;

        this.isBackgroundMining = true;
        this.startTime = Date.now();
        this.poolConnector.setBackgroundMining(true);

        console.log('Starting CryptoTab-style background mining');

        // 🔹 Mining loop
        this.miningInterval = setInterval(() => {
            if (typeof Module !== 'undefined' && Module.ccall) {
                const intensity = this.poolConnector.getMiningIntensity();
                const iterations = Math.floor((intensity / 100) * 1000);
                const result = Module.ccall('mine_step_background', 'number', ['number'], [iterations]);

                if (result > 0) {
                    this.submitShare(result);
                }
            }
        }, 100);

        // 🔹 Stats update
        this.statsInterval = setInterval(() => {
            this.updateStats();
        }, 2000);
    }

    stopBackgroundMining() {
        this.isBackgroundMining = false;
        this.poolConnector.setBackgroundMining(false);

        if (this.miningInterval) { clearInterval(this.miningInterval); this.miningInterval = null; }
        if (this.statsInterval) { clearInterval(this.statsInterval); this.statsInterval = null; }

        console.log('CryptoTab-style background mining stopped');
    }

    setIntensity(intensity) {
        this.poolConnector.setMiningIntensity(intensity);
        if (typeof Module !== 'undefined' && Module.ccall) {
            Module.ccall('set_mining_intensity', null, ['number'], [intensity]);
        }
    }

    submitShare(nonce) {
        if (this.poolConnector.isPoolConnected() && this.poolConnector.getCurrentJob()) {
            const job = this.poolConnector.getCurrentJob();
            const hashPtr = Module.ccall('get_current_hash', 'number', [], []);
            const hashArray = new Uint8Array(Module.HEAPU8.buffer, hashPtr, 32);
            const hashHex = Array.from(hashArray, b => b.toString(16).padStart(2, '0')).join('');
            this.poolConnector.submitShare(job.job_id, nonce, hashHex);
        }
    }

    setScalaJob(job) {
        if (typeof Module !== 'undefined' && Module.ccall) {
            try {
                const blob = this.hexToBytes(job.blob);
                const target = this.hexToBytes(job.target);
                const height = job.height || 0;
                const difficulty = job.difficulty || 1000;
                const jobId = job.job_id || 'unknown';

                const blobPtr = Module._malloc(blob.length);
                const targetPtr = Module._malloc(target.length);
                Module.HEAPU8.set(blob, blobPtr);
                Module.HEAPU8.set(target, targetPtr);

                Module.ccall('set_scala_job', null,
                    ['number','number','number','number','number','string'],
                    [blobPtr, blob.length, targetPtr, height, difficulty, jobId]);

                Module._free(blobPtr);
                Module._free(targetPtr);
            } catch (error) {
                console.error('Failed to set Scala job:', error);
            }
        }
    }

    updateStats() {
        if (typeof Module !== 'undefined' && Module.ccall) {
            const currentHashes = Module.ccall('get_hash_count', 'number', [], []);
            const hashRate = Module.ccall('get_hash_rate', 'number', [], []);
            this.sessionHashes = currentHashes;
            document.getElementById("hashRate").textContent = hashRate.toFixed(2);
            document.getElementById("totalHashes").textContent = currentHashes;
        }
    }

    getStats() {
        return {
            isBackgroundMining: this.isBackgroundMining,
            sessionHashes: this.sessionHashes,
            totalEarnings: this.totalEarnings,
            intensity: this.poolConnector.getMiningIntensity(),
            poolStats: this.poolConnector.getStats(),
            uptime: this.startTime ? (Date.now() - this.startTime) / 1000 : 0
        };
    }

    hexToBytes(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }
}

// ✅ Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScalaPoolConnector, SCALA_POOLS, CryptoTabStyleMiner };
}
