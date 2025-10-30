/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ONCHAINKIT_API_KEY: string
  readonly VITE_ONCHAINKIT_PROJECT_ID: string
  readonly VITE_VERCEL_URL: string
  readonly VITE_ALCHEMY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Make import.meta.env available globally for TypeScript
declare module '*.js' {
  const value: any;
  export default value;
}

// Type declarations for @coinbase/onchainkit modules
declare module '@coinbase/onchainkit/swap' {
  export const Swap: any;
  export const SwapAmountInput: any;
  export const SwapToggleButton: any;
  export const SwapButton: any;
  export const SwapMessage: any;
  export const SwapToast: any;
}

declare module '@coinbase/onchainkit/token' {
  export type Token = any;
}

