import { publicClient } from '../../config/client';
import {
  UNISWAP_V3_ADDRESSES,
  UNISWAP_V3_FEE_TIERS,
} from '../../constants/contracts';
import {
  UNISWAP_V3_FACTORY_ABI,
  UNISWAP_V3_POOL_ABI,
  UNISWAP_V3_QUOTER_ABI,
  UNISWAP_V3_ROUTER_ABI,
} from '../../constants/abis';
import { SwapQuote, Token } from '../../types';
import { parseUnits, formatUnits, encodeFunctionData } from 'viem';

/**
 * Get pool address for a token pair
 */
export async function getPoolAddress(
  token0: string,
  token1: string,
  fee: number = UNISWAP_V3_FEE_TIERS.MEDIUM
): Promise<string | null> {
  try {
    const poolAddress = await publicClient.readContract({
      address: UNISWAP_V3_ADDRESSES.FACTORY,
      abi: UNISWAP_V3_FACTORY_ABI,
      functionName: 'getPool',
      args: [token0 as `0x${string}`, token1 as `0x${string}`, fee],
    });

    if (poolAddress === '0x0000000000000000000000000000000000000000') {
      return null;
    }

    return poolAddress as string;
  } catch (error) {
    console.error('Error getting pool address:', error);
    return null;
  }
}

/**
 * Get pool liquidity
 */
export async function getPoolLiquidity(poolAddress: string): Promise<bigint> {
  try {
    const liquidity = await publicClient.readContract({
      address: poolAddress as `0x${string}`,
      abi: UNISWAP_V3_POOL_ABI,
      functionName: 'liquidity',
    });

    return liquidity as bigint;
  } catch (error) {
    console.error('Error getting pool liquidity:', error);
    return BigInt(0);
  }
}

/**
 * Get swap quote from Uniswap V3
 */
export async function getUniswapV3Quote(
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string,
  fee: number = UNISWAP_V3_FEE_TIERS.MEDIUM
): Promise<SwapQuote | null> {
  try {
    // Skip if amount is invalid
    if (!amountIn || parseFloat(amountIn) <= 0) {
      return null;
    }

    const amountInWei = parseUnits(amountIn, tokenIn.decimals);

    // First check if pool exists
    const poolExists = await getPoolAddress(
      tokenIn.address,
      tokenOut.address,
      fee
    );

    if (!poolExists) {
      console.debug(`No Uniswap V3 pool found for fee tier ${fee}`);
      return null;
    }

    // Get quote from Quoter contract
    const amountOut = await publicClient.readContract({
      address: UNISWAP_V3_ADDRESSES.QUOTER,
      abi: UNISWAP_V3_QUOTER_ABI,
      functionName: 'quoteExactInputSingle',
      args: [
        tokenIn.address as `0x${string}`,
        tokenOut.address as `0x${string}`,
        fee,
        amountInWei,
        BigInt(0), // sqrtPriceLimitX96 (0 = no limit)
      ],
    });

    // Check if output is valid
    if (!amountOut || amountOut === BigInt(0)) {
      return null;
    }

    const amountOutFormatted = formatUnits(amountOut as bigint, tokenOut.decimals);

    // Calculate price impact (simplified)
    const priceImpact = 0.5; // TODO: Calculate actual price impact

    // Estimate gas
    const gasEstimate = '150000'; // Approximate gas for V3 swap

    return {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut: amountOutFormatted,
      priceImpact,
      route: [tokenIn.address, tokenOut.address],
      gasEstimate,
      dex: 'uniswap-v3',
    };
  } catch (error) {
    // Silently fail - pool might not exist
    console.debug(`Uniswap V3 quote unavailable (fee: ${fee}):`, error);
    return null;
  }
}

/**
 * Build Uniswap V3 swap transaction data
 */
export function buildUniswapV3SwapData(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  amountOutMin: string,
  recipient: string,
  decimalsIn: number,
  decimalsOut: number,
  fee: number = UNISWAP_V3_FEE_TIERS.MEDIUM,
  deadline?: number
): `0x${string}` {
  const amountInWei = parseUnits(amountIn, decimalsIn);
  const amountOutMinWei = parseUnits(amountOutMin, decimalsOut);
  const deadlineTimestamp = deadline || Math.floor(Date.now() / 1000) + 1200; // 20 minutes

  return encodeFunctionData({
    abi: UNISWAP_V3_ROUTER_ABI,
    functionName: 'exactInputSingle',
    args: [
      {
        tokenIn: tokenIn as `0x${string}`,
        tokenOut: tokenOut as `0x${string}`,
        fee,
        recipient: recipient as `0x${string}`,
        deadline: BigInt(deadlineTimestamp),
        amountIn: amountInWei,
        amountOutMinimum: amountOutMinWei,
        sqrtPriceLimitX96: BigInt(0),
      },
    ],
  });
}

/**
 * Listen for new pool creation events
 */
export function watchPoolCreation(
  callback: (token0: string, token1: string, fee: number, pool: string) => void
): () => void {
  try {
    const unwatch = publicClient.watchContractEvent({
      address: UNISWAP_V3_ADDRESSES.FACTORY,
      abi: UNISWAP_V3_FACTORY_ABI,
      eventName: 'PoolCreated',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const { token0, token1, fee, pool } = log.args;
          if (token0 && token1 && fee !== undefined && pool) {
            callback(token0, token1, fee, pool);
          }
        });
      },
      onError: (error) => {
        console.debug('Pool watcher error:', error);
      },
    });

    return unwatch;
  } catch (error) {
    console.debug('Failed to start pool watcher:', error);
    // Return a no-op unwatch function
    return () => {};
  }
}

/**
 * Get all pools for a token
 */
export async function getTokenPools(tokenAddress: string): Promise<string[]> {
  try {
    // Check against common fee tiers
    const feeTiers = Object.values(UNISWAP_V3_FEE_TIERS);
    const commonTokens = [
      '0x4200000000000000000000000000000000000006', // WETH
      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
    ];

    const poolPromises: Promise<string | null>[] = [];

    for (const baseToken of commonTokens) {
      for (const fee of feeTiers) {
        poolPromises.push(getPoolAddress(tokenAddress, baseToken, fee));
        poolPromises.push(getPoolAddress(baseToken, tokenAddress, fee));
      }
    }

    const pools = await Promise.all(poolPromises);
    return pools.filter((pool): pool is string => pool !== null);
  } catch (error) {
    console.error('Error getting token pools:', error);
    return [];
  }
}

