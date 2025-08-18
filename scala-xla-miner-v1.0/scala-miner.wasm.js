// scala-miner.wasm.js - Proper WASM loader for Scala XLA miner
async function initWasm() {
  try {
    console.log("🔧 Loading Scala WASM miner...");
    
    // Load the .wasm file
    const response = await fetch("scala-miner.wasm");
    if (!response.ok) {
      throw new Error(`Failed to fetch scala-miner.wasm: ${response.status}`);
    }
    
    const bytes = await response.arrayBuffer();
    
    // Import object for WASM instance (if your WASM needs imports)
    const importObject = {
      env: {
        // Add any required imports here if your WASM needs them
        // For example: memory, table, functions from JS, etc.
        memory: new WebAssembly.Memory({ initial: 256 }),
        
        // Console output functions (common WASM imports)
        console_log: (ptr, len) => {
          // Implementation would need memory access to read string
          console.log("WASM log:", ptr, len);
        },
        
        // Math functions (if needed)
        Math_random: Math.random,
        Date_now: Date.now
      }
    };

    // Instantiate the WASM module
    const results = await WebAssembly.instantiate(bytes, importObject);
    const instance = results.instance;

    // Create Module object compatible with your existing code
    window.Module = {
      instance,
      exports: instance.exports,
      ready: Promise.resolve(instance),

      // ccall helper - converts JS calls to WASM function calls
      ccall: function(name, returnType, argTypes, args) {
        if (!(name in instance.exports)) {
          console.error(`❌ WASM function '${name}' not found in exports`);
          console.log("Available exports:", Object.keys(instance.exports));
          throw new Error(`Exported function ${name} not found in WASM`);
        }

        const func = instance.exports[name];
        const processedArgs = args || [];

        try {
          const result = func(...processedArgs);
          
          // Handle different return types
          switch (returnType) {
            case "string":
              // For string returns, you'd need to read from WASM memory
              // This is a simplified version - real implementation needs memory management
              return result ? String(result) : "";
            
            case "number":
              return Number(result);
            
            case "void":
              return undefined;
            
            default:
              return result;
          }
        } catch (error) {
          console.error(`❌ Error calling WASM function '${name}':`, error);
          throw error;
        }
      },

      // cwrap helper - creates JS wrapper functions
      cwrap: function(name, returnType, argTypes) {
        return (...args) => this.ccall(name, returnType, argTypes, args);
      },

      // Memory helpers (if needed for string handling)
      getValue: function(ptr, type) {
        // Implementation depends on your WASM memory layout
        return 0;
      },

      setValue: function(ptr, value, type) {
        // Implementation depends on your WASM memory layout
      },

      // Standard Emscripten-like functions
      print: function(text) {
        console.log("WASM:", text);
      },

      printErr: function(text) {
        console.error("WASM Error:", text);
      }
    };

    // Call initialization if your WASM has an init function
    if (instance.exports._initialize) {
      try {
        instance.exports._initialize();
      } catch (e) {
        console.warn("WASM _initialize failed:", e);
      }
    }

    // Trigger onRuntimeInitialized callback
    if (typeof Module.onRuntimeInitialized === 'function') {
      Module.onRuntimeInitialized();
    }

    console.log("✅ WASM miner loaded successfully");
    console.log("📋 Available exports:", Object.keys(instance.exports));
    console.log("🎯 Expected functions found:", {
      mine_step_background: 'mine_step_background' in instance.exports,
      get_current_hash: 'get_current_hash' in instance.exports, 
      get_nonce: 'get_nonce' in instance.exports
    });

    return instance;

  } catch (error) {
    console.error("❌ Failed to load WASM miner:", error);
    
    // Create fallback Module for testing
    window.Module = {
      ccall: function(name, returnType, argTypes, args) {
        console.warn(`⚠️ Fallback: WASM function '${name}' called but WASM failed to load`);
        switch (returnType) {
          case "string": return "";
          case "number": return 0;
          default: return null;
        }
      },
      cwrap: function() { return () => null; },
      print: console.log,
      printErr: console.error
    };

    throw error;
  }
}

// Initialize WASM when this script loads
initWasm();