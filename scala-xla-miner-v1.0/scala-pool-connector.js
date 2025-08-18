// scala-pool-connector.js
// Connects browser -> ws proxy -> stratum pool
class ScalaPoolConnector {
  constructor(){
    this.ws = null;
    this.messageId = 1;
    this.currentJob = null;
    this.workerId = "scala_webminer_" + Math.random().toString(36).slice(2,10);
    this.onJob = null;
    this.onOpen = null;
    this.onClose = null;
    this.onError = null;
    this.connected = false;
  }

  connect(poolKey, wallet){
    const url = `ws://localhost:8080?pool=${encodeURIComponent(poolKey)}`;
    addLog(`Connecting to pool: ${url}`,"info");
    window.__ui.setPoolStatus("Connecting");
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.connected = true;
      window.__ui.setPoolStatus("Connected");
      addLog("✅ Connected to Scala pool","success");
      this.login(wallet);
      this.onOpen && this.onOpen();
    };

    this.ws.onclose = () => {
      this.connected = false;
      window.__ui.setPoolStatus("Disconnected");
      addLog("⚠️ Disconnected from Scala pool","warning");
      this.onClose && this.onClose();
    };

    this.ws.onerror = (e) => {
      addLog("❌ WebSocket error (proxy): " + (e?.message||"[event]"), "error");
      this.onError && this.onError(e);
    };

    this.ws.onmessage = (evt) => {
      let msg;
      try { msg = JSON.parse(evt.data); }
      catch { return addLog("ℹ️ Non-JSON from proxy: "+evt.data,"warning"); }
      this.handle(msg);
    };
  }

  login(wallet){
    const loginMessage = {
      id: this.messageId++,
      jsonrpc: "2.0",
      method: "login",
      params: { login: wallet, pass: this.workerId, agent:"Scala-WebMiner/1.0" }
    };
    this.send(loginMessage);
    addLog("🔑 Sent login request with worker " + this.workerId, "info");
  }

  send(obj){
    if (this.ws && this.ws.readyState===WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  handle(message){
    if (message.error){
      addLog("❌ Pool error: " + JSON.stringify(message.error), "error");
      return;
    }
    // first response after login contains result.job
    if (message.result && message.result.job){
      this.currentJob = message.result.job;
      addLog("📥 Job received (login): " + this.currentJob.job_id, "success");
      this.onJob && this.onJob(this.currentJob);
      return;
    }
    // notify
    if (message.method === "job" && message.params){
      this.currentJob = message.params;
      addLog("📥 Job received: " + this.currentJob.job_id, "success");
      this.onJob && this.onJob(this.currentJob);
      return;
    }
    // submit result
    if (message.result && message.result.status === "OK"){
      addLog("✅ Share accepted by pool","success");
      return;
    }
  }

  submitShare(job, nonceHex, resultHex){
    if (!this.connected) return;
    const submit = {
      id: this.messageId++,
      jsonrpc: "2.0",
      method: "submit",
      params: { id: job.id, job_id: job.job_id, nonce: nonceHex, result: resultHex, algo:"panthera" }
    };
    this.send(submit);
    addLog("📤 Submitted share nonce="+nonceHex,"info");
  }

  close(){ try { this.ws && this.ws.close(); } catch{} }
}
window.ScalaPoolConnector = ScalaPoolConnector;
