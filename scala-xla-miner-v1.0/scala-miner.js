// ===============================
// Miner Wrapper
// ===============================
class ScalaMiner {
  constructor() {
    this.mining = false;
    this.poolConnector = null;
    this.intensity = 50; // Default intensity 50%
  }

  setupFromUI(wallet, poolName) {
    try {
      console.log("⚙️ Setting up miner from UI with wallet:", wallet, "pool:", poolName);
      this.poolConnector = new window.ScalaPoolConnector(wallet, poolName);
      this.poolConnector.connect();
      return true;
    } catch (e) {
      console.error("Error setting up miner:", e);
      return false;
    }
  }

  startMining() {
    console.log("🚀 Mining started");
    this.mining = true;
    
    // Update UI status
    if (window.__ui && window.__ui.setStatus) {
      window.__ui.setStatus(true);
    }
    
    this.loop();
  }

  stopMining() {
    console.log("⏹ Mining stopped");
    this.mining = false;
    
    // Update UI status
    if (window.__ui && window.__ui.setStatus) {
      window.__ui.setStatus(false);
    }
  }

  setIntensity(value) {
    console.log("⚡ Setting intensity to:", value + "%");
    
    // Store the intensity value
    this.intensity = value;
    
    // Update the UI label
    if (window.__ui && window.__ui.setIntensityLabel) {
      window.__ui.setIntensityLabel(value);
    }
    
    // Add log entry
    if (window.__ui && window.__ui.addLog) {
      window.__ui.addLog(`Mining intensity set to ${value}%`, "info");
    }
    
    // Later you can tie this to:
    // - Mining loop speed/delays (lower intensity = longer delays)
    // - WASM thread count 
    // - Hash batch sizes
    // - CPU throttling
    
    // Optional: If mining is active, you could restart with new intensity
    // if (this.mining) {
    //   this.stopMining();
    //   setTimeout(() => this.startMining(), 100);
    // }
  }

  loop() {
    if (!this.mining) return;
    
    try {
      // step one mining cycle in WASM
      Module.ccall("mine_step_background", "void", [], []);

      // check results
      const hash = Module.ccall("get_current_hash", "string", [], []);
      const nonce = Module.ccall("get_nonce", "string", [], []);

      if (hash && this.poolConnector) {
        this.poolConnector.submitResult(nonce, hash);
      }
    } catch (e) {
      console.error("mine_step error:", e);
    }
    
    // Calculate delay based on intensity (higher intensity = shorter delay)
    // Intensity 10% = 2000ms delay, 100% = 200ms delay
    const delay = Math.max(200, 2200 - (this.intensity * 20));
    
    setTimeout(() => this.loop(), delay);
  }
}

// expose globally
window.scalaMiner = new ScalaMiner();