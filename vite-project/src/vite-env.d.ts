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

