// proxy.js
// WebSocket <-> Stratum TCP proxy for Scala XLA mining

const WebSocket = require("ws");
const net = require("net");
const url = require("url");

const wss = new WebSocket.Server({ port: 8080 });

console.log("✅ WebSocket proxy listening on ws://localhost:8080");

// Map of supported pools
const POOLS = {
  herominers:        { host: "xla.herominers.com", port: 1111 },
  fairpool:          { host: "xla.fairpool.xyz",   port: 3333 },
  poolmine:          { host: "xla.poolmine.tk",    port: 4444 },
  scalaproject_low:  { host: "mine.scalaproject.io", port: 3333 },
  scalaproject_mid:  { host: "mine.scalaproject.io", port: 5555 },
  scalaproject_high: { host: "mine.scalaproject.io", port: 7777 },
  scalaproject_solo: { host: "mine.scalaproject.io", port: 8888 }
};

wss.on("connection", (ws, req) => {
  console.log("🌐 Browser miner connected");

  // Pick pool from query param ?pool=scalaproject_low
  const params = url.parse(req.url, true).query;
  const poolKey = params.pool || "herominers";
  const pool = POOLS[poolKey];

  if (!pool) {
    console.error("❌ Unknown pool:", poolKey);
    ws.send(JSON.stringify({ error: `Unknown pool: ${poolKey}` }));
    ws.close();
    return;
  }

  console.log(`🔗 Connecting to ${pool.host}:${pool.port}`);

  const tcpSocket = net.createConnection(pool.port, pool.host, () => {
    console.log(`✅ Connected to ${poolKey}`);
  });

  // TCP -> WS
  tcpSocket.on("data", (data) => {
    const str = data.toString("utf8").trim();
    console.log("⬅️ Pool -> Proxy:", str);
    try {
      if (ws.readyState === WebSocket.OPEN) ws.send(str);
    } catch (e) {
      console.error("❌ Failed to forward TCP -> WS:", e.message);
    }
  });

  tcpSocket.on("close", () => {
    console.log("⚠️ TCP pool connection closed");
    if (ws.readyState === WebSocket.OPEN) ws.close();
  });

  tcpSocket.on("error", (err) => {
    console.error("❌ TCP error:", err.message);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ error: "TCP connection error: " + err.message }));
      ws.close();
    }
  });

  // WS -> TCP (wallet+login JSON must pass through cleanly)
  ws.on("message", (msg) => {
    console.log("➡️ Miner -> Proxy:", msg.toString());
    if (tcpSocket.writable) {
      tcpSocket.write(msg.toString().trim() + "\n");
    }
  });

  ws.on("close", () => {
    console.log("⚠️ Browser miner disconnected");
    if (tcpSocket.writable) tcpSocket.end();
  });

  ws.on("error", (err) => {
    console.error("❌ WS error:", err.message);
    if (tcpSocket.writable) tcpSocket.end();
  });
});
