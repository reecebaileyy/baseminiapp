import { alchemyRPC } from '../config/client';
import { Token } from '../types';
import { getTokenInfo, getTokenMetadata } from './token';

/**
 * Get all token balances for a wallet address using Alchemy API
 */
export async function getWalletTokens(walletAddress: string): Promise<Token[]> {
  try {
    // Use Alchemy SDK method to get token balances
    const data = await alchemyRPC('alchemy_getTokenBalances', [walletAddress]);
    
    if (!data || !data.tokenBalances) {
      return [];
    }

    // Filter out tokens with zero balance
    const nonZeroBalances = data.tokenBalances.filter(
      (token: { tokenBalance: string }) => token.tokenBalance !== '0' && token.tokenBalance !== '0x0'
    );

    // Fetch metadata for each token
    const tokens: Token[] = [];
    
    for (const tokenBalance of nonZeroBalances.slice(0, 20)) { // Limit to 20 tokens
      try {
        const metadata = await alchemyRPC('alchemy_getTokenMetadata', [
          tokenBalance.contractAddress,
        ]);

        if (metadata && metadata.symbol) {
          tokens.push({
            address: tokenBalance.contractAddress,
            name: metadata.name || 'Unknown Token',
            symbol: metadata.symbol,
            decimals: metadata.decimals || 18,
            logoURI: metadata.logo,
            chainId: 8453, // Base chain
          });
        }
      } catch (error) {
        console.error(`Error fetching metadata for ${tokenBalance.contractAddress}:`, error);
        // Continue with other tokens
      }
    }

    return tokens;
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
    
    // Try to get logo from Alchemy metadata
    try {
      const metadata = await getTokenMetadata(tokenAddress);
      if (metadata?.logo) {
        tokenInfo.logoURI = metadata.logo;
      }
    } catch {
      // Logo is optional, continue without it
    }

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

