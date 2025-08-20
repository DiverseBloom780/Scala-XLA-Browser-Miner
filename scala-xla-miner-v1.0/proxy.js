// proxy.js (FIXED)
// WebSocket <-> Stratum TCP proxy for Scala XLA mining
// Enhanced logging and 1:1 JSON forwarding

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
  const timestamp = new Date().toISOString();
  console.log(`\n🌐 [${timestamp}] Browser miner connected`);

  const params = url.parse(req.url, true).query;
  const key = params.pool || "scalaproject_low";
  const pool = POOLS[key];

  if (!pool) {
    const errorMsg = JSON.stringify({
      id: 0,
      jsonrpc: "2.0",
      error: { code: -2, message: "Unknown pool key: " + key }
    });
    console.log(`❌ [${timestamp}] Unknown pool key: ${key}`);
    ws.send(errorMsg);
    return ws.close();
  }

  console.log(`🔗 [${timestamp}] Connecting to ${pool.host}:${pool.port} (pool key: ${key})`);

  const tcp = net.createConnection({ host: pool.host, port: pool.port }, () => {
    console.log(`✅ [${new Date().toISOString()}] TCP connected to ${key} (${pool.host}:${pool.port})`);
  });

  tcp.setKeepAlive(true);
  tcp.setTimeout(60000); // 60 second timeout

  // Enhanced pool -> browser forwarding with detailed logging
  tcp.on("data", (buf) => {
    const rawData = buf.toString("utf8");
    const timestamp = new Date().toISOString();
    
    // Log raw data received from pool
    console.log(`\n⬇️ [${timestamp}] RAW POOL DATA (${rawData.length} bytes):`);
    console.log(`"${rawData}"`);
    
    // Handle potential multiple JSON objects in one chunk
    const lines = rawData.trim().split("\n").filter(line => line.trim());
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      console.log(`📦 [${timestamp}] Processing line ${index + 1}/${lines.length}:`);
      console.log(`"${trimmedLine}"`);

      // Forward exact line to browser (no modifications)
      if (ws.readyState === WebSocket.OPEN) {
        console.log(`🚀 [${timestamp}] Forwarding to browser: ${trimmedLine}`);
        ws.send(trimmedLine);
      } else {
        console.log(`⚠️ [${timestamp}] Cannot forward - WebSocket not open (state: ${ws.readyState})`);
      }

      // Parse and analyze the JSON for logging purposes
      try {
        const msg = JSON.parse(trimmedLine);
        
        // Enhanced share result logging
        if (msg.id === 2) {
          console.log(`\n🎯 [${timestamp}] SHARE SUBMISSION RESPONSE:`);
          console.log(`   ID: ${msg.id}`);
          
          if (msg.result && msg.result.status === "OK") {
            console.log(`   ✅ STATUS: ACCEPTED`);
            console.log(`   📊 Result: ${JSON.stringify(msg.result)}`);
          } else if (msg.error) {
            console.log(`   ❌ STATUS: REJECTED`);
            console.log(`   🚫 Error: ${JSON.stringify(msg.error)}`);
          } else {
            console.log(`   ❓ STATUS: UNKNOWN`);
            console.log(`   📋 Full response: ${JSON.stringify(msg)}`);
          }
        }

        // Enhanced job logging
        if (msg.method === "job" || (msg.result && msg.result.job)) {
          const job = msg.method === "job" ? msg.params : msg.result.job;
          console.log(`\n🔥 [${timestamp}] NEW JOB RECEIVED:`);
          console.log(`   Job ID: ${job.job_id}`);
          console.log(`   Height: ${job.height || 'Unknown'}`);
          console.log(`   Target: ${job.target}`);
          console.log(`   Blob length: ${job.blob?.length || 'Unknown'}`);
          
          // Calculate difficulty if possible
          try {
            const targetBig = BigInt("0x" + job.target);
            const maxTarget = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
            const difficulty = Number(maxTarget / targetBig);
            console.log(`   Difficulty: ${Math.floor(difficulty).toLocaleString()}`);
          } catch (diffErr) {
            console.log(`   Difficulty: Could not calculate (${diffErr.message})`);
          }
        }

        // Login response logging
        if (msg.id === 1 && msg.result) {
          console.log(`\n🔑 [${timestamp}] LOGIN RESPONSE:`);
          console.log(`   Login ID: ${msg.result.id}`);
          console.log(`   Status: ${msg.result.status || 'Success'}`);
          if (msg.result.job) {
            console.log(`   Initial job included: ${msg.result.job.job_id}`);
          }
        }

      } catch (parseErr) {
        console.log(`⚠️ [${timestamp}] JSON parse failed: ${parseErr.message}`);
        console.log(`📝 Raw line: "${trimmedLine}"`);
      }
    });
  });

  tcp.on("error", (err) => {
    const timestamp = new Date().toISOString();
    console.error(`❌ [${timestamp}] TCP connection error: ${err.message}`);
    if (ws.readyState === WebSocket.OPEN) {
      const errorResponse = JSON.stringify({ 
        jsonrpc:"2.0", 
        error:{ code:-2, message:"TCP error: "+err.message } 
      });
      console.log(`🚨 [${timestamp}] Sending error to browser: ${errorResponse}`);
      ws.send(errorResponse);
    }
    ws.close();
  });

  tcp.on("timeout", () => {
    const timestamp = new Date().toISOString();
    console.log(`⏰ [${timestamp}] TCP connection timeout`);
    tcp.destroy();
  });

  tcp.on("close", () => {
    const timestamp = new Date().toISOString();
    console.log(`⚠️ [${timestamp}] TCP connection closed`);
    if (ws.readyState === WebSocket.OPEN) ws.close();
  });

  // Enhanced browser -> pool forwarding with share detection
  ws.on("message", (msg) => {
    const timestamp = new Date().toISOString();
    const msgStr = msg.toString().trim();
    
    console.log(`\n⬆️ [${timestamp}] BROWSER -> POOL (${msgStr.length} chars):`);
    console.log(`"${msgStr}"`);

    // Parse and analyze the message for enhanced logging
    try {
      const parsed = JSON.parse(msgStr);
      
      // Enhanced share submission logging
      if (parsed.method === "submit") {
        console.log(`\n📤 [${timestamp}] SHARE SUBMISSION DETECTED:`);
        console.log(`   Method: ${parsed.method}`);
        console.log(`   ID: ${parsed.id}`);
        console.log(`   Login ID: ${parsed.params?.id}`);
        console.log(`   Job ID: ${parsed.params?.job_id}`);
        console.log(`   Nonce: ${parsed.params?.nonce} (length: ${parsed.params?.nonce?.length})`);
        console.log(`   Result: ${parsed.params?.result?.substring(0, 16)}...${parsed.params?.result?.slice(-16)} (length: ${parsed.params?.result?.length})`);
        console.log(`   🚀 BROWSER SUBMITTED A SHARE!`);
      }

      // Login attempt logging
      if (parsed.method === "login") {
        console.log(`\n🔐 [${timestamp}] LOGIN ATTEMPT:`);
        console.log(`   Wallet: ${parsed.params?.login?.substring(0, 10)}...${parsed.params?.login?.slice(-10)}`);
        console.log(`   Agent: ${parsed.params?.agent}`);
      }

    } catch (parseErr) {
      console.log(`⚠️ [${timestamp}] Could not parse browser message: ${parseErr.message}`);
    }

    // Forward exact message to pool (with newline as required by Stratum)
    if (tcp.writable) {
      const messageWithNewline = msgStr + "\n";
      console.log(`📡 [${timestamp}] Forwarding to pool with newline: "${messageWithNewline.replace(/\n$/, '\\n')}"`);
      tcp.write(messageWithNewline);
    } else {
      console.log(`❌ [${timestamp}] Cannot forward to pool - TCP not writable`);
    }
  });

  ws.on("close", (code, reason) => {
    const timestamp = new Date().toISOString();
    console.log(`⚠️ [${timestamp}] Browser disconnected (code: ${code}, reason: ${reason})`);
    if (tcp && !tcp.destroyed) {
      tcp.destroy();
    }
  });

  ws.on("error", (err) => {
    const timestamp = new Date().toISOString();
    console.error(`❌ [${timestamp}] WebSocket error: ${err.message}`);
    if (tcp && !tcp.destroyed) {
      tcp.destroy();
    }
  });
});

// Enhanced process logging
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  wss.close(() => {
    console.log('✅ WebSocket server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

console.log("🎯 Enhanced Scala XLA Mining Proxy Ready");
console.log("📊 Available pools:", Object.keys(POOLS).join(", "));
console.log("🔍 Enhanced logging enabled for debugging share submissions");
