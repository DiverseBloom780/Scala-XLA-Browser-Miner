Run `node proxy.js` (Node 18+). Open index.html in a local server (or enable file URL fetch for wasm). Ensure scala-miner.wasm is in the same folder.

python3 -m http.server 8081
Serve your index.html + JS + WASM on http://localhost:8081/