// ui.js - dashboard helpers (no WASM here)
window.__ui = (function(){
  function addLog(message, type="info") {
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

  // tiny sparkline
  const rateHistory = [];
  function pushRate(val){
    rateHistory.push(val || 0);
    if (rateHistory.length>120) rateHistory.shift();
    drawRate();
  }
  function drawRate(){
    const c = document.getElementById("rateChart");
    if (!c) return;
    const ctx = c.getContext("2d");
    const w = c.width, h = c.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#0b1030"; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "#91a6ff"; ctx.lineWidth = 2;
    ctx.beginPath();
    const max = Math.max(1, ...rateHistory);
    const step = w / Math.max(1, rateHistory.length-1);
    rateHistory.forEach((v,i)=>{
      const x = i * step;
      const y = h - (v / max) * (h - 8) - 4;
      if(i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  function setStatus(active){
    const el = document.getElementById("miningStatus");
    if (!el) return;
    if (active) {
      el.className = "mining-status active";
      el.innerHTML = '<div class="status-indicator"></div><span>Mining Active</span>';
    } else {
      el.className = "mining-status inactive";
      el.innerHTML = '<div class="status-indicator"></div><span>Mining Inactive</span>';
    }
  }

  function setPoolStatus(text){ const el=document.getElementById("poolStatus"); if(el) el.textContent=text; }
  function setDifficulty(d){ const el=document.getElementById("difficulty"); if(el) el.textContent=d; }
  function setHeight(h){ const el=document.getElementById("blockHeight"); if(el) el.textContent=h; }
  function setHashrate(hps){ const el=document.getElementById("hashRate"); if(el) el.textContent = String(hps); pushRate(Number(hps) || 0); }
  function setTotalHashes(n){ const el=document.getElementById("totalHashes"); if(el) el.textContent = String(n); }
  function setShares(n){ const el=document.getElementById("sharesFound"); if(el) el.textContent = String(n); }
  function setUptime(secs){
    const h = Math.floor(secs/3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const el=document.getElementById("uptime"); if(el) el.textContent = `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  }
  function setIntensityLabel(v){ const el=document.getElementById("intensityValue"); if(el) el.textContent=String(v); }

  // Helper function to get form values and validate them
  function getFormData() {
    const wallet = document.getElementById('walletAddress')?.value?.trim();
    const pool = document.getElementById('poolSelect')?.value;
    
    return { wallet, pool };
  }

  // Setup mining function that grabs form data and forwards to scala-miner.js
  function setupMining() {
    const { wallet, pool } = getFormData();
    
    // Validation
    if (!wallet) {
      addLog("⚠ Please enter a wallet address", "error");
      return false;
    }
    
    if (!pool) {
      addLog("⚠ Please select a mining pool", "error");
      return false;
    }

    // Basic wallet validation (Scala addresses are typically ~95 characters)
    if (wallet.length < 90 || wallet.length > 110) {
      addLog("⚠ Wallet address appears to be invalid length", "warning");
    }

    addLog(`🔧 Setting up miner with pool: ${pool}`, "info");
    addLog(`💼 Wallet: ${wallet.substring(0, 10)}...${wallet.substring(wallet.length - 10)}`, "info");

    // Forward to the main scala-miner.js setupFromUI function
    try {
      if (window.scalaMiner && typeof window.scalaMiner.setupFromUI === 'function') {
        return window.scalaMiner.setupFromUI(wallet, pool);
      } else {
        addLog("❌ Scala miner not loaded or setupFromUI not available", "error");
        return false;
      }
    } catch (error) {
      addLog(`❌ Setup error: ${error.message}`, "error");
      console.error("Setup mining error:", error);
      return false;
    }
  }

  // Toggle background mining
  function toggleBackgroundMining() {
    const toggleEl = document.getElementById('miningToggle');
    if (!toggleEl) return;

    const isActive = toggleEl.classList.contains('active');
    
    if (isActive) {
      // Stop mining
      if (window.scalaMiner && typeof window.scalaMiner.stop === 'function') {
        window.scalaMiner.stop();
        toggleEl.classList.remove('active');
        setStatus(false);
        addLog("⏹ Background mining stopped", "info");
      }
    } else {
      // Start mining - first setup if needed
      if (setupMining()) {
        toggleEl.classList.add('active');
        setStatus(true);
        addLog("▶ Background mining started", "success");
      }
    }
  }

  // Stop mining
  function stopMining() {
    const toggleEl = document.getElementById('miningToggle');
    if (toggleEl) {
      toggleEl.classList.remove('active');
    }
    
    setStatus(false);
    
    if (window.scalaMiner && typeof window.scalaMiner.stop === 'function') {
      window.scalaMiner.stop();
      addLog("⏹ Mining stopped", "info");
    }
  }

  // Update mining intensity
  function updateIntensity(value) {
    const intensity = parseInt(value);
    setIntensityLabel(intensity);
    
    if (window.scalaMiner && typeof window.scalaMiner.setIntensity === 'function') {
      window.scalaMiner.setIntensity(intensity);
      addLog(`⚙ Mining intensity set to ${intensity}%`, "info");
    }
  }

  // public API
  return { 
    addLog, 
    setStatus, 
    setPoolStatus, 
    setDifficulty, 
    setHeight, 
    setHashrate, 
    setTotalHashes, 
    setShares, 
    setUptime, 
    setIntensityLabel,
    setupMining,
    toggleBackgroundMining,
    stopMining,
    updateIntensity,
    getFormData
  };
})();

// Make key functions available globally for HTML event handlers
window.addLog = window.__ui.addLog;
window.setupMining = window.__ui.setupMining;
window.toggleBackgroundMining = window.__ui.toggleBackgroundMining;
window.stopMining = window.__ui.stopMining;
window.updateIntensity = window.__ui.updateIntensity;

document.addEventListener("DOMContentLoaded", () => {
  window.__ui.addLog("CryptoTab-style Scala miner interface loaded", "info");
  
  // Initialize intensity slider display
  const intensitySlider = document.getElementById('intensitySlider');
  if (intensitySlider) {
    window.__ui.setIntensityLabel(intensitySlider.value);
  }
});