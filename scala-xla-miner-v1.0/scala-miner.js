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

  setupFromUI(wallet, poolName) {
    try {
      console.log(`⚙️ Setting up miner from UI with wallet: ${wallet?.substring(0, 10)}... pool: ${poolName}`);
      
      // Validate inputs
      if (!wallet || !poolName) {
        console.error("❌ Invalid wallet or pool name");
        if (window.__ui && window.__ui.addLog) {
          window.__ui.addLog("❌ Invalid wallet or pool configuration", "error");
        }
        return false;
      }

      // Store configuration
      this.minerState.wallet = wallet;
      this.minerState.pool = poolName;

      // Create pool connector
      this.poolConnector = new window.ScalaPoolConnector(wallet, poolName);
      
      // Connect to pool
      this.poolConnector.connect();

      // Update UI
      if (window.__ui && window.__ui.addLog) {
        window.__ui.addLog(`✅ Miner configured for pool: ${poolName}`, "success");
        window.__ui.addLog(`💼 Using wallet: ${wallet.substring(0, 10)}...${wallet.substring(wallet.length - 10)}`, "info");
      }

      // Set pool status in UI
      if (window.__ui && window.__ui.setPoolStatus) {
        window.__ui.setPoolStatus("Connecting...");
      }

      // Auto-start mining after successful setup
      setTimeout(() => {
        if (this.poolConnector && this.poolConnector.isConnectedToPool()) {
          this.startMining();
          if (window.__ui && window.__ui.setPoolStatus) {
            window.__ui.setPoolStatus("Connected");
          }
        }
      }, 2000);

      return true;

    } catch (e) {
      console.error("❌ Error setting up miner:", e);
      if (window.__ui && window.__ui.addLog) {
        window.__ui.addLog(`❌ Setup error: ${e.message}`, "error");
      }
      return false;
    }
  }

  startMining() {
    if (this.mining) {
      console.log("⚠️ Mining already active");
      return;
    }

    console.log("🚀 Starting mining...");
    this.mining = true;
    this.minerState.startTime = Date.now();
    
    // Update UI status
    if (window.__ui && window.__ui.setStatus) {
      window.__ui.setStatus(true);
    }

    if (window.__ui && window.__ui.addLog) {
      window.__ui.addLog("🚀 Mining started", "success");
    }
    
    // Start the mining loop
    this.loop();
    
    // Start UI update interval
    this.startUIUpdates();
  }

  stopMining() {
    console.log("⏹ Stopping mining...");
    this.mining = false;
    
    // Update UI status
    if (window.__ui && window.__ui.setStatus) {
      window.__ui.setStatus(false);
    }

    if (window.__ui && window.__ui.addLog) {
      window.__ui.addLog("⏹ Mining stopped", "info");
    }
  }

  stop() {
    // Alias for stopMining to match UI expectations
    this.stopMining();
    
    // Disconnect from pool
    if (this.poolConnector) {
      this.poolConnector.disconnect();
      this.poolConnector = null;
    }

    // Reset miner state
    this.minerState = {
      wallet: null,
      pool: null,
      startTime: null,
      totalHashes: 0,
      sharesFound: 0,
      hashRate: 0
    };

    if (window.__ui && window.__ui.setPoolStatus) {
      window.__ui.setPoolStatus("Disconnected");
    }
  }

  setIntensity(value) {
    const intensity = parseInt(value);
    console.log("⚡ Setting mining intensity to:", intensity + "%");
    
    // Store the intensity value
    this.intensity = intensity;
    
    // Update the UI label
    if (window.__ui && window.__ui.setIntensityLabel) {
      window.__ui.setIntensityLabel(intensity);
    }
    
    // Add log entry
    if (window.__ui && window.__ui.addLog) {
      window.__ui.addLog(`⚙ Mining intensity set to ${intensity}%`, "info");
    }
  }

  loop() {
    if (!this.mining) return;
    
    try {
      // Check if WASM module is available
      if (typeof Module === 'undefined' || !Module.ccall) {
        console.warn("⚠️ WASM Module not available, skipping mining step");
        setTimeout(() => this.loop(), 1000);
        return;
      }

      // Perform one mining cycle in WASM
      Module.ccall("mine_step_background", "void", [], []);
      
      // Update hash counter
      this.minerState.totalHashes++;

      // Check for results
      const hash = Module.ccall("get_current_hash", "string", [], []);
      const nonce = Module.ccall("get_nonce", "string", [], []);

      if (hash && this.poolConnector && this.poolConnector.isConnectedToPool()) {
        const submitted = this.poolConnector.submitResult(nonce, hash);
        if (submitted) {
          this.minerState.sharesFound++;
          console.log("✅ Share submitted, total shares:", this.minerState.sharesFound);
        }
      }

    } catch (e) {
      console.error("❌ Mining loop error:", e);
      if (window.__ui && window.__ui.addLog) {
        window.__ui.addLog(`❌ Mining error: ${e.message}`, "error");
      }
    }
    
    // Calculate delay based on intensity (higher intensity = shorter delay)
    // Intensity 10% = 2000ms delay, 100% = 200ms delay
    const delay = Math.max(100, 2100 - (this.intensity * 20));
    
    setTimeout(() => this.loop(), delay);
  }

  startUIUpdates() {
    const updateUI = () => {
      if (!this.mining) return;

      // Calculate runtime
      const runtime = this.minerState.startTime ? 
        Math.floor((Date.now() - this.minerState.startTime) / 1000) : 0;

      // Calculate hash rate (approximate)
      const hashRate = runtime > 0 ? Math.floor(this.minerState.totalHashes / runtime) : 0;
      this.minerState.hashRate = hashRate;

      // Update UI elements
      if (window.__ui) {
        if (window.__ui.setHashrate) window.__ui.setHashrate(hashRate);
        if (window.__ui.setTotalHashes) window.__ui.setTotalHashes(this.minerState.totalHashes);
        if (window.__ui.setShares) window.__ui.setShares(this.minerState.sharesFound);
        if (window.__ui.setUptime) window.__ui.setUptime(runtime);
      }

      // Continue updating every 2 seconds
      setTimeout(updateUI, 2000);
    };

    // Start UI updates
    updateUI();
  }

  // Utility methods
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

// Create global instance
window.scalaMiner = new ScalaMiner();

// Also expose individual methods for backward compatibility
window.setupMining = () => window.scalaMiner.setupFromUI(
  document.getElementById('walletAddress')?.value?.trim(),
  document.getElementById('poolSelect')?.value
);

window.startMining = () => window.scalaMiner.startMining();
window.stopMining = () => window.scalaMiner.stop();
window.updateIntensity = (value) => window.scalaMiner.setIntensity(value);

console.log("✅ ScalaMiner loaded and exposed globally");