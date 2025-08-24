#!/bin/bash

# Scala CryptoNote Proxy Setup Script
# Fixes connection stability issues

echo "🚀 Setting up FIXED Scala CryptoNote Mining Proxy"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
if [ ! -f "package.json" ]; then
    echo "Creating package.json..."
    cat > package.json << EOF
{
  "name": "scala-cryptonote-proxy",
  "version": "1.0.0",
  "description": "Fixed WebSocket to CryptoNote proxy for Scala mining",
  "main": "proxy.js",
  "scripts": {
    "start": "node proxy.js",
    "debug": "node proxy.js --debug"
  },
  "dependencies": {
    "ws": "^8.14.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
EOF
fi

# Install npm dependencies
npm install

echo ""
echo "🔧 FIXES Applied in this version:"
echo "=================================="
echo "✅ Proper TCP connection handling with timeouts"
echo "✅ Fixed CryptoNote protocol message parsing"  
echo "✅ Improved reconnection logic with exponential backoff"
echo "✅ Better error handling and connection state management"
echo "✅ Fixed buffer handling for TCP data"
echo "✅ Proper login/job/submit sequence"
echo "✅ Connection stability improvements"
echo "✅ Reduced connection timeout to 30s"
echo "✅ Limited reconnection attempts to 3"
echo "✅ Better TCP socket error handling"

echo ""
echo "🎯 Available Scala Pools:"
echo "========================="
echo "scala      - Scala Project Official (mine.scalaproject.io:3333)"
echo "herominers - HeroMiners Scala (scala.herominers.com:10130)"
echo "fairpool   - FairPool Scala (scala.fairpool.xyz:4455)"

echo ""
echo "🚀 Starting the FIXED proxy server..."
echo "======================================"
echo "WebSocket URL: ws://localhost:8080?pool=scala"
echo "Press Ctrl+C to stop"
echo ""

# Start the proxy with debug logging
node proxy.js --debug