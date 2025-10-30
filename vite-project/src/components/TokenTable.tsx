import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDiscoveredTokens } from '../hooks/useDiscoveredTokens';
import { useTokenFormatter } from '../hooks/useTokenFormatter';
import { getTokenLogoUrl } from 'lib/utils/tokenLogos';
import type { TokenQueryParams } from 'lib/types';
import styles from './TokenTable.module.css';

interface TokenTableProps {
  filter?: 'all' | 'listed' | 'unlisted';
  limit?: number;
}

type SortField = TokenQueryParams['sort'];

export function TokenTable({ filter = 'all', limit = 100 }: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>('volume');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { data, isLoading, error } = useDiscoveredTokens({
    sort: sortField,
    order,
    limit,
    filter,
  });

  const { formatCurrency, formatTimeAgo } = useTokenFormatter();

  interface TokenRow {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    chainId: number;
    logoURI?: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    liquidity: number;
    marketCap: number;
    holderCount: number;
    createdAt: number;
    isVerified: boolean;
    isListed?: boolean;
    sourceDEX?: string | null;
    poolCount?: number;
  }

  const tokens: TokenRow[] = data?.data || [];
  const isLoadingState = isLoading;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setOrder('desc');
    }
  };


  if (isLoadingState) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading tokens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading tokens. Please try again.</p>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tokens found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Token</th>
              <th onClick={() => handleSort('volume')} className={styles.sortable}>
                Volume 24h {sortField === 'volume' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('liquidity')} className={styles.sortable}>
                Liquidity {sortField === 'liquidity' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('holders')} className={styles.sortable}>
                Holders {sortField === 'holders' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('marketcap')} className={styles.sortable}>
                Market Cap {sortField === 'marketcap' && (order === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
              <th onClick={() => handleSort('created')} className={styles.sortable}>
                Age {sortField === 'created' && (order === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={token.address}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/tokens/${token.address}`} className={styles.tokenLink}>
                    <div className={styles.tokenInfo}>
                      <div className={styles.tokenIcon}>
                        <img 
                          src={getTokenLogoUrl(token.address, token.chainId)} 
                          alt={token.symbol} 
                          width={32} 
                          height={32}
                          onError={(e) => {
                            // Fallback to placeholder on error
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = target.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div className={styles.placeholder} style={{ display: 'none' }}>{token.symbol[0]}</div>
                      </div>
                      <div>
                        <div className={styles.tokenName}>{token.name}</div>
                        <div className={styles.tokenSymbol}>{token.symbol}</div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td title="24h trading volume from DEXs">{token.volume24h > 0 ? formatCurrency(token.volume24h) : 'N/A'}</td>
                <td title="Total Value Locked (TVL) in USD">{token.liquidity > 0 ? formatCurrency(token.liquidity) : 'N/A'}</td>
                <td title="Number of token holders">{typeof token.holderCount === 'number' ? token.holderCount.toLocaleString() : Number(token.holderCount).toLocaleString()}</td>
                <td title="Market capitalization">{token.marketCap > 0 ? formatCurrency(token.marketCap) : 'N/A'}</td>
                <td className={token.isListed ? styles.positive : styles.negative}>
                  {token.isListed 
                    ? (token.sourceDEX === 'uniswap-v3' ? 'Listed on Uniswap' : 
                       token.sourceDEX === 'aerodrome' ? 'Listed on Aerodrome' : 
                       token.sourceDEX === 'both' ? 'Listed on Both' : 'Listed')
                    : 'Unlisted'}
                </td>
                <td>{formatTimeAgo(token.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

