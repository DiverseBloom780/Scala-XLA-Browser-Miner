// ===============================
// Scala Pool Connector
// Handles pool connection, jobs, and submissions
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
        
        // Send login request
        this.send({
          id: 1,
          method: "login",
          params: {
            login: this.wallet,
            pass: "x",
            agent: "ScalaWebMiner/1.0"
          }
        });
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("[POOL] Received message:", data);

          // Handle login success
          if (data.id === 1 && data.result && data.result.id) {
            this.loginId = data.result.id;
            console.log("🔑 Logged in successfully, assigned id:", this.loginId);
            
            if (data.result.job) {
              this.handleJob(data.result.job);
            }
          }

          // Handle new jobs
          if (data.method === "job" || (data.result && data.result.job)) {
            const job = data.method === "job" ? data.params : data.result.job;
            this.handleJob(job);
          }

          // Handle submit result
          if (data.id === 2) { // Submit response
            if (data.result && data.result.status === "OK") {
              console.log("✅ Share accepted by pool");
              // Notify UI of successful share
              if (window.addLog) {
                window.addLog("✅ Share accepted by pool", "success");
              }
            } else if (data.error) {
              console.warn("❌ Pool error:", data.error);
              if (window.addLog) {
                window.addLog(`❌ Pool error: ${data.error.message || data.error}`, "error");
              }
            }
          }

          // Handle other errors
          if (data.error && data.id !== 2) {
            console.warn("⚠️ Pool error:", data.error);
            if (window.addLog) {
              window.addLog(`⚠️ Pool error: ${data.error.message || data.error}`, "error");
            }
          }
        } catch (e) {
          console.error("Error parsing pool message:", e);
        }
      };

      this.socket.onerror = (err) => {
        console.error("⚠️ Socket error:", err);
        this.isConnected = false;
        if (window.addLog) {
          window.addLog("⚠️ Pool connection error", "error");
        }
      };

      this.socket.onclose = (event) => {
        console.warn("⚠️ Disconnected from pool (code:", event.code, ")");
        this.isConnected = false;
        this.loginId = null;
        
        if (window.addLog) {
          window.addLog("⚠️ Disconnected from pool, retrying in 5s...", "warning");
        }
        
        // Auto-reconnect after 5 seconds
        this.reconnectTimeout = setTimeout(() => {
          console.log("[POOL] Attempting to reconnect...");
          this.connect();
        }, 5000);
      };

    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      if (window.addLog) {
        window.addLog(`Failed to connect to pool: ${error.message}`, "error");
      }
    }
  }

  disconnect() {
    console.log("[POOL] Disconnecting from pool...");
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    
    this.isConnected = false;
    this.loginId = null;
    this.job = null;
    
    console.log("✅ Disconnected from pool");
    if (window.addLog) {
      window.addLog("✅ Disconnected from pool", "info");
    }
  }

  handleJob(job) {
    console.log("🔥 New job received:", job.job_id);
    this.job = job;

    if (window.addLog) {
      window.addLog(`🔥 New job: ${job.job_id}`, "info");
    }

    // Send job blob + target to WASM miner
    try {
      if (typeof Module !== 'undefined' && Module.ccall) {
        Module.ccall(
          "set_scala_job",
          "void",
          ["string", "string", "string"],
          [job.blob, job.job_id, job.target]
        );
        console.log("✅ Job sent to WASM miner");
      } else {
        console.warn("⚠️ WASM Module not available, cannot set job");
      }
    } catch (e) {
      console.error("❌ Error setting job in WASM:", e);
      if (window.addLog) {
        window.addLog(`❌ Error setting job: ${e.message}`, "error");
      }
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
    
    if (window.addLog) {
      window.addLog(`📤 Submitting share: ${resultHash.substring(0, 16)}...`, "info");
    }

    try {
      this.send({
        id: 2,
        method: "submit",
        params: {
          id: this.loginId,
          job_id: this.job.job_id,
          nonce: nonce,
          result: resultHash
        }
      });
      return true;
    } catch (error) {
      console.error("❌ Error submitting result:", error);
      if (window.addLog) {
        window.addLog(`❌ Submit error: ${error.message}`, "error");
      }
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

  // Utility methods
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

// Expose globally so scala-miner.js can use it
window.ScalaPoolConnector = ScalaPoolConnector;

console.log("✅ ScalaPoolConnector class loaded and exposed globally");