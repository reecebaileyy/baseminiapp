import { publicClient, alchemyRPC } from '../config/client';
import { ERC20_ABI } from '../constants/abis';
import type { Token } from '../types';
import { formatUnits } from 'viem';

/**
 * Fetch basic token information from contract
 */
export async function getTokenInfo(tokenAddress: string): Promise<Token> {
  try {
    const [name, symbol, decimals] = await Promise.all([
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'name',
      }),
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'symbol',
      }),
      publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'decimals',
      }),
    ]);

    return {
      address: tokenAddress,
      name: name as string,
      symbol: symbol as string,
      decimals: decimals as number,
      chainId: 8453, // Base chain ID
    };
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw new Error(`Failed to fetch token info for ${tokenAddress}`);
  }
}

/**
 * Get token balance for an address
 */
export async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string
): Promise<string> {
  try {
    // Handle native ETH (no contract address)
    if (tokenAddress === '0x0000000000000000000000000000000000000000') {
      const balance = await publicClient.getBalance({
        address: walletAddress as `0x${string}`,
      });
      return formatUnits(balance, 18); // ETH has 18 decimals
    }

    // Handle ERC-20 tokens
    const balance = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [walletAddress as `0x${string}`],
    });

    const token = await getTokenInfo(tokenAddress);
    return formatUnits(balance as bigint, token.decimals);
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return '0';
  }
}

/**
 * Get token holder count using Alchemy API
 * Note: Free tier doesn't support this, returns placeholder
 */
export async function getTokenHolderCount(tokenAddress: string): Promise<number> {
  try {
    // This requires Alchemy Growth plan or custom indexing
    // For now, return a placeholder for known tokens
    const knownHolders: Record<string, number> = {
      '0x4200000000000000000000000000000000000006': 150000, // WETH
      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': 200000, // USDC
      '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA': 50000, // USDbC
      '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb': 30000, // DAI
      '0x940181a94A35A4569E4529A3CDfB74e38FD98631': 15000, // AERO
      '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22': 25000, // cbETH
      '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452': 20000, // wstETH
    };
    
    return knownHolders[tokenAddress.toLowerCase()] || 1000; // Default placeholder
  } catch (error) {
    console.error('Error fetching holder count:', error);
    return 0;
  }
}

/**
 * Get token total supply
 */
export async function getTokenTotalSupply(tokenAddress: string): Promise<string> {
  try {
    const totalSupply = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'totalSupply',
    });

    const token = await getTokenInfo(tokenAddress);
    return formatUnits(totalSupply as bigint, token.decimals);
  } catch (error) {
    console.error('Error fetching total supply:', error);
    return '0';
  }
}

/**
 * Get token metadata including logo
 * Note: This would normally use Alchemy's Enhanced APIs which require Growth plan
 * For now, returns null - metadata should be provided from other sources
 */
export async function getTokenMetadata(tokenAddress: string) {
  try {
    // Alchemy's token metadata API requires Growth plan on Base chain
    // Returning null for free tier - tokens should provide their own metadata
    return null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
}

/**
 * Check if address is a contract
 */
export async function isContract(address: string): Promise<boolean> {
  try {
    const code = await publicClient.getBytecode({
      address: address as `0x${string}`,
    });
    return code !== undefined && code !== '0x';
  } catch {
    return false;
  }
}

/**
 * Get multiple token balances for a wallet
 */
export async function getTokenBalances(
  walletAddress: string,
  tokenAddresses: string[]
): Promise<Record<string, string>> {
  try {
    const balances = await Promise.all(
      tokenAddresses.map((tokenAddress) =>
        getTokenBalance(tokenAddress, walletAddress)
      )
    );

    return tokenAddresses.reduce(
      (acc, address, index) => {
        acc[address] = balances[index];
        return acc;
      },
      {} as Record<string, string>
    );
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return {};
  }
}

