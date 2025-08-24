
````markdown
# Modern-Style Scala (XLA) WebAssembly Miner

A professional browser-based cryptocurrency miner for the Scala (XLA) network, inspired by CryptoTab Browser’s seamless mining experience.  
This implementation uses WebAssembly for high-performance mining with the **Panthera** algorithm, optimized for desktop CPUs and mobile devices.

---

## 🚀 Features

### Core Mining Features
- **Scala (XLA) Network Support**: Native support for Scala cryptocurrency mining  
- **Panthera Algorithm**: Efficient, CPU/ARM-friendly algorithm  
- **WebAssembly Performance**: Compiled mining core for maximum speed  
- **Background Mining**: CryptoTab-style continuous background mining  
- **Mining Intensity Control**: Adjustable power (10–100%)  
- **Real-time Monitoring**: Live hash rate, shares, and stats  

### User Experience
- **Explicit Consent**: User must allow mining before it starts  
- **Transparent Resource Usage**: CPU usage is clear and configurable  
- **Professional Interface**: Modern, responsive UI inspired by CryptoTab  
- **Mobile Optimized**: Runs on mobile browsers with ARM CPUs  
- **Simple Controls**: Start/stop toggle, intensity slider  

### Security & Privacy
- **No Personal Data Collection**  
- **Secure Pool Connections** (via local proxy)  
- **User Control**: Stop or adjust mining anytime  
- **Wallet Integration**: Directly credit a Scala wallet  

---

## 📋 Requirements

### Browser
- Chrome 57+, Firefox 52+, Safari 11+, Edge 16+  
- WebAssembly enabled  
- Minimum 2GB RAM recommended  

### Network
- Internet connection for pool connectivity  
- Local WebSocket proxy (`proxy.js`) to bridge browser ↔ Stratum pool  

---

## 🛠️ Installation & Setup

### Quick Start
1. Download the miner files:
   - `scala-miner.html` (main interface)  
   - `scala-miner.js` (miner logic + pool connector)  
   - `scala-miner.wasm.js` (WebAssembly loader)  
   - `scala-miner.wasm` (compiled mining core)  
   - `proxy.js` (WebSocket ↔ Stratum TCP proxy)  

2. Serve the files and start the proxy:
   ```bash
   # Serve miner files
   npx http-server -p 8081 --mime .wasm=application/wasm

   # Run WebSocket ↔ Stratum proxy
   npm install ws
node proxy.js --debug
````

3. Open `http://127.0.0.1:8081/scala-miner.html` in your browser

---

### Configuration

* **Wallet Setup**: Enter your **95-character Scala (XLA) wallet address** (starts with `Se…`)
* **Pool Selection**: Choose from supported pools via proxy:

  * `herominers` → xla.herominers.com:1111
  * `fairpool` → xla.fairpool.xyz:3333
  * `poolmine` → xla.poolmine.tk:4444
  * `scalaproject_low` (3333), `mid` (5555), `high` (7777), `solo` (8888)
* **Mining Intensity**: Adjust from 10% to 100%

---

## 🎯 Usage Guide

1. **Accept Terms**: Check the consent box
2. **Enter Wallet**: Paste your Scala wallet (`Se…`)
3. **Select Pool**: Pick from the dropdown (proxy forwards it)
4. **Setup Mining**: Click “Setup Mining” to connect
5. **Start Mining**: Toggle background mining

### Monitoring

* **Hash Rate**: Current speed (H/s)
* **Total Hashes**: Work done this session
* **Shares Found**: Valid shares submitted
* **Uptime**: Mining session duration

---

## 🏗️ Technical Architecture

### Files

* `scala-miner.js` → Miner logic + integrated pool connector
* `scala-miner.wasm.js` → WASM loader
* `scala-miner.wasm` → Compiled Panthera mining core
* `scala-miner.html` → Browser interface
* `proxy.js` → WebSocket ↔ Stratum bridge
* 'panthera-hash.wasm and panthera-hash.js for hashing

### How It Works

* Browser miner → `ws://localhost:8080?pool=...`
* Proxy → Forwards to actual pool (e.g. HeroMiners, FairPool, ScalaProject)
* WASM miner core runs Panthera algorithm and submits valid shares

---

## 🌐 Supported Mining Pools

Through the proxy you can mine on:

* **HeroMiners** → `xla.herominers.com:1111` (0.9% fee)
* **FairPool** → `xla.fairpool.xyz:3333` (0.6% fee)
* **PoolMine** → `xla.poolmine.tk:4444` (1.0% fee)
* **ScalaProject Pools**:

  * Low (3333), Mid (5555), High (7777), Solo (8888)

---

## 📊 Performance

* **Desktop CPU (Intel i7)**: \~500–2000 H/s
* **Laptop CPU (Intel i5)**: \~300–800 H/s
* **Mobile ARM**: \~50–200 H/s

---

## 🔒 Security Notes

* Always require explicit user consent
* No background mining without permission
* All hashing happens locally, nothing else collected
* Pools accessed securely through proxy

---

## 🐛 Troubleshooting

**WebAssembly Not Loading**

* Use a supported browser
* Serve over HTTP, not `file://`
* Check console for errors

**No Balance Appearing**

* Ensure wallet starts with `Se`
* Make sure proxy is running (`node proxy.js`)
* Wait until at least 1 valid share is accepted

**Low Hash Rate**

* Increase intensity
* Close heavy apps/tabs
* Try another browser

---

## 📈 Development

### Build from Source

1. Install [Emscripten](https://emscripten.org)
2. Compile:

   ```bash
   make clean && make
   ```
3. Run locally:

   ```bash
   make run
   ```

---

## 📄 License

MIT License — open source and free to use.

---

## 🙏 Acknowledgments

* **Scala Network** → Panthera algorithm
* **CryptoTab Browser** → UX inspiration
* **Emscripten** → WebAssembly toolchain
* **XLArig** → Reference miner implementation

---

⚠️ **Important Notice**: This miner requires explicit user consent. Always be transparent about resource usage and give users easy stop controls.
