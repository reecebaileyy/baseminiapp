import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Helper to detect if running in browser or Node.js
const isBrowser = typeof window !== 'undefined';

// Get environment variables (works in both browser and Node.js)
function getEnvVar(key: string): string | undefined {
  try {
    // Always check process.env first for Node.js/serverless context
    if (typeof process !== 'undefined' && process.env) {
      const nodeValue = process.env[key];
      if (nodeValue) return nodeValue;
    }
    
    // Try Vite environment variables (browser only)
    if (isBrowser && typeof import.meta !== 'undefined' && import.meta.env) {
      try {
        const value = import.meta.env[key];
        if (value) return value as string;
      } catch (e) {
        // Ignore import.meta errors
      }
    }
  } catch (e) {
    // Ignore all errors
  }
  
  return undefined;
}

// Get Alchemy API key
const alchemyApiKey = getEnvVar('VITE_ALCHEMY_API_KEY');

// Force use of public RPC for discovery (to avoid Alchemy free tier limits on eth_getLogs)
// Alchemy free tier only allows 10 block ranges for eth_getLogs
const FORCE_PUBLIC_RPC = true;

// Use Alchemy API with proper setup
// According to Alchemy docs: 
// 1. Use HTTPS for standard JSON-RPC requests (eth_call, eth_getBalance, etc.)
// 2. WebSockets are ONLY for subscriptions (eth_subscribe) - not for standard reads
// 3. Filter-based watching (viem's watchContractEvent) should be avoided
const useAlchemy = !FORCE_PUBLIC_RPC; // Disable for discovery

// Set RPC URL - always fallback to public RPC
// Validate the API key is actually valid
const isValidAlchemyKey = !FORCE_PUBLIC_RPC && alchemyApiKey && 
  alchemyApiKey !== '' && 
  alchemyApiKey !== 'xxxx' && 
  alchemyApiKey.length > 20;

// Ensure we always have a valid RPC URL
let rpcUrl = 'https://base.drpc.org'; // Default: Public Base RPC

if (isValidAlchemyKey && useAlchemy) {
  rpcUrl = `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;
}

// Validate the URL before creating the client
if (!rpcUrl || typeof rpcUrl !== 'string' || !rpcUrl.startsWith('http')) {
  console.error('Invalid RPC URL, falling back to public Base RPC');
  rpcUrl = 'https://base.drpc.org';
}

// Log which RPC we're using
if (!isBrowser) {
  console.log(`[RPC] Using ${FORCE_PUBLIC_RPC ? 'public Base RPC (forced)' : (isValidAlchemyKey ? 'Alchemy API' : 'public Base RPC')}`);
}

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl as string, {
    fetchOptions: {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
    timeout: 20000, // 20 seconds for Base network
    retryCount: 2, // Retry failed requests once
    retryDelay: 1000, // Wait 1s between retries
  }),
});

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

// Alchemy API helpers (browser only)
export const alchemyFetch = async (endpoint: string, options?: RequestInit) => {
  const apiKey = getEnvVar('VITE_ALCHEMY_API_KEY');
  if (!apiKey) {
    throw new Error('Alchemy API key not configured. Add VITE_ALCHEMY_API_KEY to .env');
  }
  
  const baseUrl = `https://base-mainnet.g.alchemy.com/v2/${apiKey}`;
  
  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Alchemy API error: ${response.statusText}`);
  }

  return response.json();
};

// JSON-RPC helper for Alchemy (browser only)
export const alchemyRPC = async (method: string, params: unknown[] = []) => {
  const apiKey = getEnvVar('VITE_ALCHEMY_API_KEY');
  
  if (!apiKey || apiKey === '') {
    throw new Error('Alchemy API key not configured. Add VITE_ALCHEMY_API_KEY to .env');
  }

  const response = await fetch(
    `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Alchemy RPC error ${response.status}: ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || 'RPC request failed');
  }

  return data.result;
};

