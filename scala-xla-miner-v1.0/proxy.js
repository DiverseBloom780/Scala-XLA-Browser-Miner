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
  if (!pool){
    ws.send(JSON.stringify({ id:0, jsonrpc:"2.0", error:{code:-2, message:"Unknown pool key: "+key} }));
    return ws.close();
  }
  console.log(`🔗 Connecting to ${pool.host}:${pool.port}`);

  const tcp = net.createConnection({ host: pool.host, port: pool.port }, ()=>{
    console.log("✅ Connected to", key);
  });

  tcp.setKeepAlive(true);

  tcp.on("data", (buf)=>{
    const s = buf.toString("utf8");
    ws.readyState===WebSocket.OPEN && ws.send(s);
  });

  tcp.on("error", (err)=>{
    console.error("❌ TCP error:", err.message);
    ws.readyState===WebSocket.OPEN && ws.send(JSON.stringify({ jsonrpc:"2.0", error:{ code:-2, message:"TCP error: "+err.message } }));
    ws.close();
  });

  tcp.on("close", ()=>{
    console.log("⚠️ TCP closed");
    ws.readyState===WebSocket.OPEN && ws.close();
  });

  ws.on("message", (msg)=>{
    // Ensure newline framing for Stratum
    if (tcp.writable) tcp.write(String(msg).trim()+"\n");
  });

  ws.on("close", ()=>{
    console.log("⚠️ Browser disconnected");
    tcp.destroy();
  });

  ws.on("error", (err)=>{
    console.error("❌ WS error:", err.message);
    tcp.destroy();
  });
});
