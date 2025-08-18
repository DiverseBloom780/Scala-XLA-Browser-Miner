
// Simple wasm loader shim if your build expects a separate loader.
if (typeof createModule !== "undefined") {
  createModule().then(m => { window.Module = m; });
}
