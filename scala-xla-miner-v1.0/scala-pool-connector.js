// ... existing code ...

class ScalaPoolConnector {
  constructor(wallet, poolName) {
    // ... existing code ...
  }

  connect() {
    // ... existing code ...
  }

  submitResult(nonce, hash) {
    // ... existing code ...
  }
}

window.ScalaPoolConnector = ScalaPoolConnector;

// ... rest of code ...// ===============================
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
  }

  connect() {
    const url = `ws://localhost:8080?pool=${this.poolName}`;
    console.log(`[POOL] Connecting to ${url} with wallet ${this.wallet}`);

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("✅ Connected to Scala pool");
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
      const data = JSON.parse(event.data);

      // Handle login success
      if (data.id === 1 && data.result && data.result.id) {
        this.loginId = data.result.id;
        console.log("🔑 Logged in, assigned id:", this.loginId);
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
      if (data.result && data.result.status === "OK") {
        console.log("✅ Share accepted by pool");
      } else if (data.error) {
        console.warn("❌ Pool error:", data.error);
      }
    };

    this.socket.onerror = (err) => {
      console.error("⚠️ Socket error:", err);
    };

    this.socket.onclose = () => {
      console.warn("⚠️ Disconnected from pool, retrying in 5s...");
      setTimeout(() => this.connect(), 5000);
    };
  }

  handleJob(job) {
    console.log("📥 New job received:", job.job_id);
    this.job = job;

    // Send job blob + target to WASM miner
    try {
      Module.ccall(
        "set_scala_job",
        "void",
        ["string", "string", "string"],
        [job.blob, job.job_id, job.target]
      );
    } catch (e) {
      console.error("set_scala_job error:", e);
    }
  }

  submitResult(nonce, resultHash) {
    if (!this.job) return;
    console.log("📤 Submitting result:", resultHash);

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
  }

  send(obj) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(obj));
    }
  }
}

// Expose globally
window.ScalaPoolConnector = ScalaPoolConnector;
