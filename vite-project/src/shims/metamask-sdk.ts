// Minimal browser shim for optional MetaMask SDK import used by some connectors.
// This avoids bundling the heavy SDK and resolves Vite import in web builds.

type InitOptions = Record<string, unknown>;

class SDKShim {
  constructor(_opts?: InitOptions) {}
  // No-op init returning a minimal shape to satisfy consumers if called.
  async init() {
    return {} as unknown;
  }
}

export default SDKShim;


