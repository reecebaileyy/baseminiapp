import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Validate environment variables - Alchemy API key is optional
const hasAlchemyKey = import.meta.env.VITE_ALCHEMY_API_KEY && import.meta.env.VITE_ALCHEMY_API_KEY !== '';

// Use Alchemy API with proper setup
// According to Alchemy docs: 
// 1. Use HTTPS for standard JSON-RPC requests (eth_call, eth_getBalance, etc.)
// 2. WebSockets are ONLY for subscriptions (eth_subscribe) - not for standard reads
// 3. Filter-based watching (viem's watchContractEvent) should be avoided
const useAlchemy = true; // Now enabled after fixing event watching

const rpcUrl = (hasAlchemyKey && useAlchemy)
  ? `https://base-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`
  : 'https://base.drpc.org'; // Public Base RPC (no restrictions)

console.log((hasAlchemyKey && useAlchemy)
  ? 'Using Alchemy API' 
  : hasAlchemyKey 
    ? 'ℹ️  Using public RPC (Alchemy key available but not enabled)' 
    : 'ℹ️  Using public Base RPC (add VITE_ALCHEMY_API_KEY to .env)');

if (hasAlchemyKey && useAlchemy) {
  console.log('Using HTTPS ');
}

export const publicClient = createPublicClient({
  chain: base,
  transport: http(rpcUrl, {
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

// Alchemy API helpers
export const alchemyFetch = async (endpoint: string, options?: RequestInit) => {
  const baseUrl = `https://base-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`;
  
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

// JSON-RPC helper for Alchemy
export const alchemyRPC = async (method: string, params: unknown[] = []) => {
  const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
  
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

