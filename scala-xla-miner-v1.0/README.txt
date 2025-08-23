Run `node proxy.js` (Node 18+). Open index.html in a local server (or enable file URL fetch for wasm). Ensure scala-miner.wasm is in the same folder.

npx http-server -p 8081
Serve your index.html + JS + WASM on http://127.0.0.1:8081/scala-miner.html