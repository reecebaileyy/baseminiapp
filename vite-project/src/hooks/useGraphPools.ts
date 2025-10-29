import { useQuery } from '@tanstack/react-query';
import { execute } from '../../.graphclient';
import { gql } from '@graphql-mesh/utils';

export type PoolOrderBy = 'createdAtTimestamp' | 'totalValueLockedUSD' | 'volumeUSD' | 'createdAtBlockNumber';
export type OrderDirection = 'asc' | 'desc';

/**
 * Hook to fetch new pools created on the protocol
 */
export function useNewPools(options?: {
  first?: number;
  orderBy?: PoolOrderBy;
  orderDirection?: OrderDirection;
}) {
  const { 
    first = 20, 
    orderBy = 'createdAtTimestamp',
    orderDirection = 'desc'
  } = options || {};

  return useQuery({
    queryKey: ['graph', 'new-pools', first, orderBy, orderDirection],
    queryFn: async () => {
      const query = gql`
        query GetNewPools($first: Int!, $orderBy: Pool_orderBy!, $orderDirection: OrderDirection!) {
          pools(
            first: $first
            orderBy: $orderBy
            orderDirection: $orderDirection
            where: { liquidity_gt: "0" }
          ) {
            id
            createdAtTimestamp
            createdAtBlockNumber
            token0 {
              id
              symbol
              name
              decimals
            }
            token1 {
              id
              symbol
              name
              decimals
            }
            feeTier
            liquidity
            sqrtPrice
            token0Price
            token1Price
            tick
            volumeToken0
            volumeToken1
            volumeUSD
            feesUSD
            txCount
            totalValueLockedToken0
            totalValueLockedToken1
            totalValueLockedUSD
            liquidityProviderCount
            poolDayData(first: 1, orderBy: date, orderDirection: desc) {
              id
              date
              volumeUSD
              feesUSD
              tvlUSD
            }
            poolHourData(first: 1, orderBy: periodStartUnix, orderDirection: desc) {
              id
              periodStartUnix
              volumeUSD
              feesUSD
              tvlUSD
            }
          }
        }
      `;

      const result = await execute(query, { 
        first,
        orderBy,
        orderDirection
      });
      return result?.data?.pools || [];
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute for new pools
  });
}

