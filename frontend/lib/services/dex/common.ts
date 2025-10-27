/**
 * Common DEX utilities and helpers
 */

/**
 * Check if two token addresses are the same (case-insensitive)
 */
export function isSameToken(addressA: string, addressB: string): boolean {
  return addressA.toLowerCase() === addressB.toLowerCase();
}

/**
 * Normalize token address (convert ETH to WETH)
 */
export function normalizeTokenAddress(address: string, wethAddress: string): string {
  // Convert native ETH to WETH
  if (address === '0x0000000000000000000000000000000000000000') {
    return wethAddress;
  }
  return address;
}

/**
 * Sort token addresses for consistent pool lookups
 */
export function sortTokens(tokenA: string, tokenB: string): [string, string] {
  return tokenA.toLowerCase() < tokenB.toLowerCase() 
    ? [tokenA, tokenB] 
    : [tokenB, tokenA];
}

