// proxy.js
// WebSocket <-> Stratum TCP proxy for Scala XLA mining

const WebSocket = require("ws");
const net = require("net");
const url = require("url");

const wss = new WebSocket.Server({ port: 8080 });
console.log("✅ WebSocket proxy listening on ws://localhost:8080");

const POOLS = {
  herominers:         { host: "xla.herominers.com",   port: 1111 },
  fairpool:           { host: "xla.fairpool.xyz",     port: 3333 },
  poolmine:           { host: "xla.poolmine.tk",      port: 4444 },
  scalaproject_low:   { host: "mine.scalaproject.io", port: 3333 },
  scalaproject_mid:   { host: "mine.scalaproject.io", port: 5555 },
  scalaproject_high:  { host: "mine.scalaproject.io", port: 7777 },
  scalaproject_solo:  { host: "mine.scalaproject.io", port: 8888 }
};

wss.on("connection", (ws, req) => {
  console.log("🌐 Browser miner connected");

  const params = url.parse(req.url, true).query;
  const key = params.pool || "scalaproject_low";
  const pool = POOLS[key];

  if (!pool) {
    ws.send(JSON.stringify({
      id: 0,
      jsonrpc: "2.0",
      error: { code: -2, message: "Unknown pool key: " + key }
    }));
    return ws.close();
  }

  console.log(`🔗 Connecting to ${pool.host}:${pool.port}`);

  const tcp = net.createConnection({ host: pool.host, port: pool.port }, () => {
    console.log("✅ Connected to", key);
  });

  tcp.setKeepAlive(true);

  // Forward pool -> browser
  tcp.on("data", (buf) => {
    const s = buf.toString("utf8").trim();
    if (!s) return;

    // Pools may send multiple JSON objects in one chunk
    s.split("\n").forEach((line) => {
      if (!line) return;

      // Always log raw JSON
      console.log("⬇️ Pool raw:", line);

      // Forward to browser
      if (ws.readyState === WebSocket.OPEN) ws.send(line);

      try {
        const msg = JSON.parse(line);

        // --- Share results ---
        if (msg.id === 2 && msg.result && msg.result.status === "OK") {
          console.log("✅ Share accepted by pool!");
        } else if (msg.id === 2 && msg.error) {
          console.log("❌ Share rejected:", msg.error.message || JSON.stringify(msg.error));
        }

        // --- New job info ---
        if (msg.method === "job" || (msg.result && msg.result.job)) {
          const job = msg.method === "job" ? msg.params : msg.result.job;
          let difficulty = null;
          try {
            const targetNum = parseInt(job.target, 16);
            if (targetNum > 0) difficulty = Math.floor(0xFFFFFFFF / targetNum);
          } catch {}
          if (difficulty) {
            console.log(`🔥 New job ${job.job_id} | Height: ${job.height} | Target: ${job.target} | Diff: ${difficulty}`);
          } else {
            console.log(`🔥 New job ${job.job_id} | Height: ${job.height} | Target: ${job.target}`);
          }
        }
      } catch (err) {
        console.log("⚠️ JSON parse failed:", err.message);
      }
    });
  });

  tcp.on("error", (err) => {
    console.error("❌ TCP error:", err.message);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ jsonrpc:"2.0", error:{ code:-2, message:"TCP error: "+err.message } }));
    }
    ws.close();
  });

  tcp.on("close", () => {
    console.log("⚠️ TCP closed");
    if (ws.readyState === WebSocket.OPEN) ws.close();
  });

  // Forward browser -> pool
  ws.on("message", (msg) => {
    const clean = msg.toString().trim();
    console.log("⬆️ Browser -> Pool:", clean);

    // Highlight when browser submits a share
    if (clean.includes('"method":"submit"')) {
      console.log("📤 Browser submitted a share!");
    }

    if (tcp.writable) tcp.write(clean + "\n");
  });

  ws.on("close", () => {
    console.log("⚠️ Browser disconnected");
    tcp.destroy();
  });

  ws.on("error", (err) => {
    console.error("❌ WS error:", err.message);
    tcp.destroy();
  });
});
