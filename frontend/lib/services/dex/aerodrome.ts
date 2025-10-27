import { publicClient } from '../../config/client';
import { AERODROME_ADDRESSES } from '../../constants/contracts';
import { AERODROME_ROUTER_ABI } from '../../constants/abis';
import { SwapQuote, Token } from '../../types';
import { parseUnits, formatUnits, encodeFunctionData } from 'viem';

/**
 * Get swap quote from Aerodrome
 */
export async function getAerodromeQuote(
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string,
  stable: boolean = false
): Promise<SwapQuote | null> {
  try {
    // Skip if amount is invalid
    if (!amountIn || parseFloat(amountIn) <= 0) {
      return null;
    }

    const amountInWei = parseUnits(amountIn, tokenIn.decimals);

    // Build route
    const routes = [
      {
        from: tokenIn.address as `0x${string}`,
        to: tokenOut.address as `0x${string}`,
        stable,
      },
    ];

    // Get quote
    const amounts = await publicClient.readContract({
      address: AERODROME_ADDRESSES.ROUTER,
      abi: AERODROME_ROUTER_ABI,
      functionName: 'getAmountsOut',
      args: [amountInWei, routes],
    });

    const amountOut = (amounts as bigint[])[1]; // Second element is output amount
    
    // Check if output is valid
    if (!amountOut || amountOut === BigInt(0)) {
      return null;
    }

    const amountOutFormatted = formatUnits(amountOut, tokenOut.decimals);

    // Calculate price impact (simplified)
    const priceImpact = 0.3; // TODO: Calculate actual price impact

    // Estimate gas
    const gasEstimate = '180000'; // Approximate gas for Aerodrome swap

    return {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut: amountOutFormatted,
      priceImpact,
      route: [tokenIn.address, tokenOut.address],
      gasEstimate,
      dex: 'aerodrome',
    };
  } catch (error) {
    // Silently fail - pool might not exist
    console.debug('Aerodrome quote unavailable:', error);
    return null;
  }
}

/**
 * Build Aerodrome swap transaction data
 */
export function buildAerodromeSwapData(
  tokenIn: string,
  tokenOut: string,
  amountIn: string,
  amountOutMin: string,
  recipient: string,
  decimalsIn: number,
  decimalsOut: number,
  stable: boolean = false,
  deadline?: number
): `0x${string}` {
  const amountInWei = parseUnits(amountIn, decimalsIn);
  const amountOutMinWei = parseUnits(amountOutMin, decimalsOut);
  const deadlineTimestamp = deadline || Math.floor(Date.now() / 1000) + 1200; // 20 minutes

  const routes = [
    {
      from: tokenIn as `0x${string}`,
      to: tokenOut as `0x${string}`,
      stable,
    },
  ];

  return encodeFunctionData({
    abi: AERODROME_ROUTER_ABI,
    functionName: 'swapExactTokensForTokens',
    args: [
      amountInWei,
      amountOutMinWei,
      routes,
      recipient as `0x${string}`,
      BigInt(deadlineTimestamp),
    ],
  });
}

/**
 * Compare quotes between stable and volatile pools
 */
export async function getBestAerodromeQuote(
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string
): Promise<SwapQuote | null> {
  try {
    const [stableQuote, volatileQuote] = await Promise.all([
      getAerodromeQuote(tokenIn, tokenOut, amountIn, true),
      getAerodromeQuote(tokenIn, tokenOut, amountIn, false),
    ]);

    // Return the quote with higher output
    if (!stableQuote && !volatileQuote) return null;
    if (!stableQuote) return volatileQuote;
    if (!volatileQuote) return stableQuote;

    const stableAmount = parseFloat(stableQuote.amountOut);
    const volatileAmount = parseFloat(volatileQuote.amountOut);

    return stableAmount > volatileAmount ? stableQuote : volatileQuote;
  } catch (error) {
    console.error('Error getting best Aerodrome quote:', error);
    return null;
  }
}

