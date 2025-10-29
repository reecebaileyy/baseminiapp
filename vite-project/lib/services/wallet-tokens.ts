import type { Token } from '../types';
import { getTokenInfo, getTokenMetadata } from './token';

/**
 * Get all token balances for a wallet address
 * Note: This is a simplified version that doesn't use Alchemy-specific APIs
 * For full functionality, you'd need to track transfers or use an indexer
 */
export async function getWalletTokens(_walletAddress: string): Promise<Token[]> {
  try {
    // For now, return empty array as we need to track token transfers
    // to determine which tokens a wallet holds. This requires either:
    // 1. An indexer service like Alchemy's Enhanced APIs (requires Growth plan)
    // 2. Scanning all transfer events for the wallet (expensive)
    // 3. Using a public API that tracks wallet tokens
    
    console.warn('getWalletTokens: Token balance tracking requires paid Alchemy plan or custom indexer');
    
    return [];
  } catch (error) {
    console.error('Error fetching wallet tokens:', error);
    return [];
  }
}

/**
 * Validate and fetch token info from contract address
 */
export async function getTokenFromAddress(tokenAddress: string): Promise<Token | null> {
  try {
    // Validate address format
    if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      throw new Error('Invalid address format');
    }

    // Try to fetch token info
    const tokenInfo = await getTokenInfo(tokenAddress);
    
    // Note: getTokenMetadata() currently returns null as Alchemy's Enhanced APIs
    // require a Growth plan. Logo should be provided via the TokenWithMetrics type.
    // This is kept for future enhancement when metadata API is available.
    await getTokenMetadata(tokenAddress);

    return tokenInfo;
  } catch (error) {
    console.error('Error fetching token from address:', error);
    return null;
  }
}

/**
 * Search for tokens by symbol or name (from a given list)
 */
export function searchTokens(tokens: Token[], query: string): Token[] {
  const lowerQuery = query.toLowerCase();
  return tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(lowerQuery) ||
      token.name.toLowerCase().includes(lowerQuery) ||
      token.address.toLowerCase().includes(lowerQuery)
  );
}

