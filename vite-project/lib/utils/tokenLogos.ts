import { getAddress, isAddress } from 'viem';

/**
 * Token Logo Utility
 * 
 * Fetches token logos from multiple sources with fallback:
 * 1. TrustWallet Assets CDN
 * 2. DexScreener API
 * 3. Default placeholder
 */

/**
 * Get token logo URL from TrustWallet Assets CDN
 * Format: https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/{chain}/assets/{checksumAddress}/logo.png
 */
function getTrustWalletLogoUrl(address: string, chainId: number): string {
  // Map chain IDs to TrustWallet asset paths
  const chainMap: Record<number, string> = {
    8453: 'base', // Base Mainnet
    1: 'ethereum', // Ethereum Mainnet
    56: 'binance', // BNB Chain
    43114: 'avalanchec', // Avalanche C-Chain
    137: 'polygon', // Polygon
    42161: 'arbitrum', // Arbitrum One
    10: 'optimism', // Optimism
    250: 'fantom', // Fantom Opera
  };

  const chain = chainMap[chainId] || 'ethereum';
  
  try {
    // Convert to checksum address for TrustWallet
    const checksumAddress = getAddress(address);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain}/assets/${checksumAddress}/logo.png`;
  } catch (error) {
    // Invalid address, return null
    return '';
  }
}

/**
 * Get token logo URL from DexScreener API
 * Note: This is async but we return a URL template since we can't make API calls here
 * The component will need to fetch the logo and handle errors
 */
function getDexScreenerLogoUrl(address: string, chainId: number): string {
  // DexScreener uses lowercase addresses without 0x prefix in some cases
  const chainMap: Record<number, string> = {
    8453: 'base',
    1: 'ethereum',
    56: 'bsc',
    43114: 'avalanche',
    137: 'polygon',
    42161: 'arbitrum',
    10: 'optimism',
    250: 'fantom',
  };

  const chain = chainMap[chainId] || 'ethereum';
  
  return `https://api.dexscreener.com/latest/dex/tokens/${chain}:${address}`;
}

/**
 * Get token logo URL with fallback strategy
 * 
 * @param address - Token address
 * @param chainId - Chain ID
 * @returns Logo URL string or empty string for placeholder
 */
export function getTokenLogoUrl(address: string, chainId: number): string {
  if (!address || !isAddress(address)) {
    return '';
  }

  // Primary source: TrustWallet CDN
  const trustWalletUrl = getTrustWalletLogoUrl(address, chainId);
  if (trustWalletUrl) {
    return trustWalletUrl;
  }

  // Fallback: DexScreener API
  const dexscreenerUrl = getDexScreenerLogoUrl(address, chainId);
  if (dexscreenerUrl) {
    return dexscreenerUrl;
  }

  // Return empty string to indicate no logo available
  return '';
}

/**
 * Get multiple token logo URLs in batch
 */
export function getTokenLogoUrls(
  addresses: string[],
  chainId: number
): Record<string, string> {
  const logos: Record<string, string> = {};
  
  for (const address of addresses) {
    logos[address.toLowerCase()] = getTokenLogoUrl(address, chainId);
  }
  
  return logos;
}

/**
 * Fetch actual logo data from DexScreener API (for async operations)
 * Components should use this when TrustWallet CDN fails
 */
export async function fetchDexScreenerLogo(
  address: string,
  chainId: number
): Promise<string | null> {
  try {
    const url = getDexScreenerLogoUrl(address, chainId);
    const response = await fetch(url);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    const token = data.pairs?.[0];
    
    if (token && token.tokenAddress?.toLowerCase() === address.toLowerCase()) {
      return token.imageUrl || null;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching DexScreener logo for ${address}:`, error);
    return null;
  }
}
