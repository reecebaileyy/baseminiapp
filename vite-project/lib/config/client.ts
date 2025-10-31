import { createPublicClient, createWalletClient, custom, http, webSocket } from 'viem';
import { base } from 'viem/chains';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Runtime environment detection
const isBrowser = typeof window !== 'undefined';
const onVercel = typeof process !== 'undefined' && !!process.env.VERCEL;

// Resolve RPC URLs from env (server vs client)
const httpUrl = !isBrowser
  ? process.env.ALCHEMY_HTTP_URL ?? 'https://base.drpc.org'
  : (import.meta as any).env?.VITE_ALCHEMY_HTTP_URL ?? 'https://base.drpc.org';

const wsUrl = !isBrowser
  ? process.env.ALCHEMY_WS_URL ?? 'wss://base.drpc.org'
  : (import.meta as any).env?.VITE_ALCHEMY_WS_URL ?? 'wss://base.drpc.org';



export const httpTransport = http(httpUrl, {
  timeout: 20000,
  retryCount: 2,
  retryDelay: 1000,
});

export const wsTransport = webSocket(wsUrl);

export const httpClient = createPublicClient({ chain: base, transport: httpTransport });
export const wsClient = createPublicClient({ chain: base, transport: wsTransport });

export function getPublicClient(opts?: { preferWebSocket?: boolean }) {
  if (onVercel || !isBrowser) {
    console.log('[RPC] getPublicClient -> HTTP (server/Vercel enforced)');
    return httpClient; // enforce HTTP on server/Vercel
  }
  const useWs = ((import.meta as any).env?.VITE_USE_WEBSOCKET === 'true') || !!opts?.preferWebSocket;
  console.log(`[RPC] getPublicClient -> ${useWs ? 'WebSocket' : 'HTTP'} (VITE_USE_WEBSOCKET=${(import.meta as any).env?.VITE_USE_WEBSOCKET})`);
  return useWs ? wsClient : httpClient;
}

export const serverPublicClient = httpClient;
export const publicClient = httpClient; // backwards compatibility

export function getRpcMode(): 'HTTP' | 'WebSocket' {
  return (onVercel || !isBrowser)
    ? 'HTTP'
    : (((import.meta as any).env?.VITE_USE_WEBSOCKET === 'true') ? 'WebSocket' : 'HTTP');
}

export function getRpcUrls() {
  return { httpUrl, wsUrl };
}

// Get wallet client for transactions (requires user's wallet)
export function getWalletClient() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No ethereum provider found');
  }

  return createWalletClient({
    chain: base,
    transport: custom(window.ethereum),
  });
}


