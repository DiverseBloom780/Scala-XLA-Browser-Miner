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

  // public
  return { addLog, setStatus, setPoolStatus, setDifficulty, setHeight, setHashrate, setTotalHashes, setShares, setUptime, setIntensityLabel };
})();

// Remove redundant and unused code
// The following global helper functions are not needed and should be removed.

document.addEventListener("DOMContentLoaded", ()=> window.__ui.addLog("CryptoTab-style Scala miner interface loaded","info"));