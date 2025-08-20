[README.md](https://github.com/user-attachments/files/21828191/README.md)
# Modern-Style Scala (XLA) WebAssembly Miner

A professional browser-based cryptocurrency miner for Scala (XLA) network, inspired by CryptoTab Browser's seamless mining experience. This implementation uses WebAssembly for high-performance mining with the Panthera algorithm, optimized for CPU and mobile devices.

## 🚀 Features

### Core Mining Features
- **Scala (XLA) Network Support**: Native support for Scala cryptocurrency mining
- **Panthera Algorithm**: Efficient CPU/ARM-friendly mining algorithm
- **WebAssembly Performance**: High-performance mining using compiled WebAssembly
- **Background Mining**: CryptoTab-style continuous background mining
- **Mining Intensity Control**: Adjustable mining power (10-100%)
- **Real-time Monitoring**: Live hash rate, earnings, and statistics

### User Experience
- **Explicit Consent**: Clear user consent system before mining starts
- **Transparent Resource Usage**: Full transparency about CPU usage
- **Professional Interface**: Modern, responsive design inspired by CryptoTab
- **Mobile Optimized**: Works efficiently on mobile devices
- **Easy Controls**: Simple start/stop and intensity adjustment

### Security & Privacy
- **No Personal Data Collection**: Privacy-focused design
- **Secure Pool Connections**: WebSocket-based secure pool connectivity
- **User Control**: Complete user control over mining operations
- **Wallet Integration**: Direct connection to user's Scala wallet

## 📋 Requirements

### Browser Support
- Modern browsers with WebAssembly support (Chrome 57+, Firefox 52+, Safari 11+)
- JavaScript enabled
- Minimum 2GB RAM recommended for optimal performance

### Network Requirements
- Internet connection for pool connectivity
- WebSocket support for real-time pool communication

## 🛠️ Installation & Setup

### Quick Start
1. Download the miner files:
   - `scala-miner.html` (main interface)
   - `scala-miner.js` (WebAssembly loader)
   - `scala-miner.wasm` (compiled mining core)
   - `scala-pool-connector.js` (pool connectivity)

2. Serve the files using a web server:
   npx http-server -p 8081 --mime .wasm=application/wasm
   Run the node proxy.js

3. Open `http://127.0.0.1:8081/scala-miner.html` in your browser

### Configuration
1. **Wallet Setup**: Enter your 95-character Scala (XLA) wallet address
2. **Pool Selection**: Choose from supported mining pools:
   - HeroMiners XLA (0.9% fee)
   - FairPool XLA (0.6% fee) 
   - PoolMine XLA (1.0% fee)
   - Demo Pool (for testing)

3. **Mining Intensity**: Adjust from 10% (low impact) to 100% (maximum performance)

## 🎯 Usage Guide

### Getting Started
1. **Accept Terms**: Check the consent checkbox to acknowledge CPU usage
2. **Enter Wallet**: Input your Scala wallet address (starts with "Sumo" or "Suma")
3. **Select Pool**: Choose a mining pool from the dropdown
4. **Setup Mining**: Click "Setup Mining" to configure the connection
5. **Start Mining**: Toggle "Background Mining" to begin

### CryptoTab-Style Features
- **Background Operation**: Mining continues while browsing other tabs
- **Intensity Control**: Adjust mining power based on your needs
- **Real-time Stats**: Monitor hash rate, earnings, and performance
- **Automatic Reconnection**: Maintains pool connection automatically

### Monitoring Your Mining
- **Hash Rate**: Current mining speed (hashes per second)
- **Total Hashes**: Cumulative hashes computed this session
- **Shares Found**: Valid shares submitted to the pool
- **Earnings**: Estimated XLA earned (updates in real-time)
- **Session Time**: Total mining duration

## 🏗️ Technical Architecture

### WebAssembly Core (`panthera-wasm.c`)
- Implements Panthera algorithm for Scala mining
- 2MB scratchpad for memory-hard operations
- Optimized for browser execution
- Intensity-based mining control

### Pool Connectivity (`scala-pool-connector.js`)
- WebSocket-based pool communication
- Support for multiple Scala mining pools
- Automatic reconnection and error handling
- CryptoTab-style background mining management

### User Interface (`cryptotab-template.html`)
- Modern, responsive design
- Real-time statistics dashboard
- Mining intensity controls
- Activity logging and monitoring

## 🔧 Development

### Building from Source
1. **Install Emscripten**:
   ```bash
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   ./emsdk install latest
   ./emsdk activate latest
   source ./emsdk_env.sh
   ```

2. **Compile the Miner**:
   ```bash
   make clean && make
   ```

3. **Test Locally**:
   ```bash
   make run
   ```

### File Structure
```
monero-wasm-miner/            # Pool connectivity
├── panthera-wasm.c           # WebAssembly mining core
├── cryptotab-template.html   # User interface template
├── Makefile                  # Build configuration
├── scala-miner.html          # Compiled output
├── scala-miner.js            # Generated JS loader
├── scala-miner.wasm          # Compiled WebAssembly
└── README.md                 # This documentation
```

## 🌐 Supported Mining Pools

### HeroMiners XLA
- **URL**: `wss://xla.herominers.com:1111`
- **Fee**: 0.9%
- **Location**: Global
- **Features**: Reliable, high uptime

### FairPool XLA  
- **URL**: `wss://xla.fairpool.xyz:3333`
- **Fee**: 0.6%
- **Location**: Europe
- **Features**: Low fees, fair distribution

### PoolMine XLA
- **URL**: `wss://xla.poolmine.tk:4444`
- **Fee**: 1.0%
- **Location**: Asia
- **Features**: Asian region optimization

### Demo Pool
- **URL**: `ws://localhost:8081`
- **Fee**: 0%
- **Location**: Local
- **Features**: Testing and development

## 📊 Performance Optimization

### Browser Optimization
- **Memory Management**: Efficient 2MB scratchpad allocation
- **CPU Throttling**: Intensity-based performance control
- **Background Processing**: Non-blocking mining operations
- **Resource Monitoring**: Real-time performance tracking

### Mobile Optimization
- **ARM-Friendly Algorithm**: Panthera optimized for mobile CPUs
- **Battery Awareness**: Adjustable intensity for battery life
- **Responsive Design**: Mobile-first interface design
- **Touch Controls**: Mobile-friendly interaction

## 🔒 Security Considerations

### Privacy Protection
- **No Data Collection**: No personal information stored or transmitted
- **Local Processing**: All mining computation done locally
- **Secure Connections**: WebSocket SSL/TLS for pool communication
- **User Control**: Complete user control over mining operations

### Best Practices
- **Explicit Consent**: Always require user consent before mining
- **Resource Transparency**: Clear information about resource usage
- **Easy Exit**: Simple controls to stop mining at any time
- **Performance Impact**: Adjustable intensity to minimize impact

## 🐛 Troubleshooting

### Common Issues

**WebAssembly Not Loading**
- Ensure browser supports WebAssembly
- Check browser console for error messages
- Verify all files are served from web server (not file://)

**Pool Connection Failed**
- Check internet connection
- Verify wallet address format (95 characters, starts with "Sumo"/"Suma")
- Try different mining pool
- Check browser console for WebSocket errors

**Low Hash Rate**
- Increase mining intensity slider
- Close other resource-intensive applications
- Check CPU temperature and throttling
- Try different browser for comparison

**Mining Not Starting**
- Ensure consent checkbox is checked
- Verify wallet address is configured
- Check pool connection status
- Review activity log for error messages

### Debug Mode
Enable browser developer tools and check console for detailed logging:
- Mining algorithm initialization
- Pool connection status
- WebAssembly module loading
- Hash rate calculations

## 📈 Performance Benchmarks

### Typical Hash Rates
- **Desktop CPU (Intel i7)**: 500-2000 H/s
- **Mobile CPU (ARM)**: 50-200 H/s  
- **Laptop CPU (Intel i5)**: 300-800 H/s

### Memory Usage
- **WebAssembly Module**: ~16KB
- **Panthera Scratchpad**: 2MB
- **JavaScript Overhead**: ~1MB
- **Total Browser Impact**: ~3-4MB

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Set up Emscripten development environment
3. Make changes to source files
4. Test thoroughly in multiple browsers
5. Submit pull request with detailed description

### Code Style
- Follow existing C/JavaScript conventions
- Add comments for complex algorithms
- Test on multiple browsers and devices
- Ensure mobile compatibility

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Scala Network**: For the innovative Panthera algorithm
- **CryptoTab Browser**: For inspiration on seamless mining UX
- **Emscripten Project**: For WebAssembly compilation tools
- **XLArig Team**: For Scala mining implementation reference

## 📞 Support

For issues, questions, or contributions:
- Check the troubleshooting section above
- Review browser console for error messages
- Test with different browsers and devices
- Ensure latest version of files

---

**⚠️ Important Notice**: This miner requires explicit user consent and should only be used with full transparency about resource usage. Always respect user choice and provide easy controls to stop mining.

**🔗 Powered by**: WebAssembly • Scala (XLA) Network • Panthera Algorithm

