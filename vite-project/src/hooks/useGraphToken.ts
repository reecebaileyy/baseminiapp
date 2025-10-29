import { useQuery } from '@tanstack/react-query';
import { execute } from '../../.graphclient';
import { gql } from '@graphql-mesh/utils';

/**
 * Hook to fetch token by address
 */
export function useTokenByAddress(tokenAddress: string | undefined) {
  return useQuery({
    queryKey: ['graph', 'token', tokenAddress],
    queryFn: async () => {
      if (!tokenAddress) throw new Error('Token address is required');
      
      const query = gql`
        query GetTokenByAddress($id: ID!) {
          token(id: $id) {
            id
            symbol
            name
            decimals
            totalSupply
            volume
            volumeUSD
            untrackedVolumeUSD
            feesUSD
            txCount
            poolCount
            totalValueLocked
            totalValueLockedUSD
            totalValueLockedUSDUntracked
            derivedETH
          }
        }
      `;

      const result = await execute(query, { id: tokenAddress.toLowerCase() });
      return result?.data?.token;
    },
    enabled: !!tokenAddress,
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to fetch token stats including day and hour data
 */
export function useTokenStats(tokenAddress: string | undefined, options?: {
  dayDataFirst?: number;
  hourDataFirst?: number;
}) {
  const { dayDataFirst = 7, hourDataFirst = 24 } = options || {};

  const tokenQuery = useQuery({
    queryKey: ['graph', 'token-stats', tokenAddress, dayDataFirst],
    queryFn: async () => {
      if (!tokenAddress) throw new Error('Token address is required');
      
      const query = gql`
        query GetTokenStats($tokenId: ID!, $dayDataFirst: Int!) {
          token(id: $tokenId) {
            id
            symbol
            name
            decimals
            totalSupply
            volume
            volumeUSD
            untrackedVolumeUSD
            feesUSD
            txCount
            poolCount
            totalValueLocked
            totalValueLockedUSD
            totalValueLockedUSDUntracked
            derivedETH
            whitelistPools(first: 1000, where: { liquidity_gt: "0" }, orderBy: totalValueLockedUSD, orderDirection: desc) {
              id
              token0 {
                id
                symbol
                decimals
              }
              token1 {
                id
                symbol
                decimals
              }
              token0Price
              token1Price
              totalValueLockedToken0
              totalValueLockedToken1
              totalValueLockedUSD
              liquidityProviderCount
              volumeUSD
              untrackedVolumeUSD
            }
            tokenDayData(first: $dayDataFirst, orderBy: date, orderDirection: desc) {
              id
              date
              volume
              volumeUSD
              untrackedVolumeUSD
              totalValueLocked
              totalValueLockedUSD
              priceUSD
              feesUSD
              open
              high
              low
              close
            }
          }
          bundles(first: 1) {
            id
            ethPriceUSD
          }
        }
      `;

      const result = await execute(query, { 
        tokenId: tokenAddress.toLowerCase(),
        dayDataFirst 
      });
      return {
        token: result?.data?.token,
        ethPrice: result?.data?.bundles?.[0]?.ethPriceUSD || null,
        pools: result?.data?.token?.whitelistPools || [],
      };
    },
    enabled: !!tokenAddress,
    staleTime: 60000, // 1 minute
  });

  const hourDataQuery = useQuery({
    queryKey: ['graph', 'token-hour-data', tokenAddress, hourDataFirst],
    queryFn: async () => {
      if (!tokenAddress) throw new Error('Token address is required');
      
      const query = gql`
        query GetTokenHourData($tokenId: ID!, $first: Int!) {
          tokenHourDatas(
            first: $first
            where: { token: $tokenId }
            orderBy: periodStartUnix
            orderDirection: desc
          ) {
            id
            periodStartUnix
            volume
            volumeUSD
            untrackedVolumeUSD
            totalValueLocked
            totalValueLockedUSD
            priceUSD
            feesUSD
            open
            high
            low
            close
          }
        }
      `;

      const result = await execute(query, { 
        tokenId: tokenAddress.toLowerCase(),
        first: hourDataFirst 
      });
      return result?.data?.tokenHourDatas || [];
    },
    enabled: !!tokenAddress,
    staleTime: 30000, // 30 seconds
  });

  return {
    token: tokenQuery.data?.token,
    ethPrice: tokenQuery.data?.ethPrice,
    pools: tokenQuery.data?.pools || [],
    dayData: tokenQuery.data?.token?.tokenDayData || [],
    hourData: hourDataQuery.data || [],
    isLoading: tokenQuery.isLoading || hourDataQuery.isLoading,
    isError: tokenQuery.isError || hourDataQuery.isError,
    error: tokenQuery.error || hourDataQuery.error,
    refetch: () => {
      tokenQuery.refetch();
      hourDataQuery.refetch();
    },
  };
}

