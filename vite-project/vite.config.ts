import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'lib': path.resolve(__dirname, './lib'),
      // Alias MetaMask SDK to a local shim to avoid optional dependency resolution in browser
      '@metamask/sdk': path.resolve(__dirname, './src/shims/metamask-sdk.ts'),
    },
  },
  optimizeDeps: {
    // Skip pre-bundling MetaMask SDK to prevent esbuild resolution errors
    exclude: ['@metamask/sdk'],
  },
})
