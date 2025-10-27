import { useQuery, useMutation } from '@tanstack/react-query';
import { tradingApi } from '@/lib/api/trading';
import { Token, SwapQuote } from '@/lib/types';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ERC20_ABI } from '@/lib/constants/abis';
import { parseUnits } from 'viem';

/**
 * Get swap quote
 */
export function useSwapQuote(
  tokenIn: Token | undefined,
  tokenOut: Token | undefined,
  amountIn: string | undefined
) {
  return useQuery({
    queryKey: ['quote', tokenIn?.address, tokenOut?.address, amountIn],
    queryFn: () => tradingApi.getBestQuote(tokenIn!, tokenOut!, amountIn!),
    enabled: !!tokenIn && !!tokenOut && !!amountIn && parseFloat(amountIn) > 0,
    staleTime: 10000, // 10 seconds
    refetchInterval: 15000,
  });
}

/**
 * Get Uniswap V3 quote only
 */
export function useUniswapQuote(
  tokenIn: Token | undefined,
  tokenOut: Token | undefined,
  amountIn: string | undefined
) {
  return useQuery({
    queryKey: ['quote', 'uniswap', tokenIn?.address, tokenOut?.address, amountIn],
    queryFn: () => tradingApi.getUniswapQuote(tokenIn!, tokenOut!, amountIn!),
    enabled: !!tokenIn && !!tokenOut && !!amountIn && parseFloat(amountIn) > 0,
    staleTime: 10000,
  });
}

/**
 * Get Aerodrome quote only
 */
export function useAerodromeQuote(
  tokenIn: Token | undefined,
  tokenOut: Token | undefined,
  amountIn: string | undefined
) {
  return useQuery({
    queryKey: ['quote', 'aerodrome', tokenIn?.address, tokenOut?.address, amountIn],
    queryFn: () => tradingApi.getAerodromeQuote(tokenIn!, tokenOut!, amountIn!),
    enabled: !!tokenIn && !!tokenOut && !!amountIn && parseFloat(amountIn) > 0,
    staleTime: 10000,
  });
}

/**
 * Execute token approval
 */
export function useTokenApproval() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const approve = async (tokenAddress: string, spenderAddress: string, amount: string, decimals: number) => {
    if (!address) throw new Error('Wallet not connected');

    const amountWei = parseUnits(amount, decimals);

    writeContract({
      address: tokenAddress as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spenderAddress as `0x${string}`, amountWei],
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    approve,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Execute swap
 */
export function useSwap() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const executeSwap = async (quote: SwapQuote, slippage: number = 0.5) => {
    if (!address) throw new Error('Wallet not connected');

    const txData = tradingApi.buildSwapTransaction(quote, address, slippage);

    writeContract({
      address: txData.to as `0x${string}`,
      abi: [], 
      functionName: 'swap',
      value: txData.value,
    });
  };

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    executeSwap,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}

/**
 * Simulate swap before executing
 */
export function useSwapSimulation() {
  return useMutation({
    mutationFn: async ({
      quote,
      recipient,
      slippage,
    }: {
      quote: SwapQuote;
      recipient: string;
      slippage?: number;
    }) => {
      return tradingApi.simulateSwap(quote, recipient, slippage);
    },
  });
}

