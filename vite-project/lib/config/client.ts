import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  console.error('❌ NEXT_PUBLIC_ALCHEMY_API_KEY is not set in .env.local');
  console.error('Please create a .env.local file with your Alchemy API key');
}

// Public client for reading blockchain data
export const publicClient = createPublicClient({
  chain: base,
  transport: http(
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      ? `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      : 'https://mainnet.base.org' // Fallback to public RPC (rate limited)
  ),
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
  const baseUrl = `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
  
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
  const response = await fetch(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
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

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || 'RPC request failed');
  }

  return data.result;
};

