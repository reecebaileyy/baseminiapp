import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDiscoveredTokens } from '../hooks/useDiscoveredTokens';
import { useTokenFormatter } from '../hooks/useTokenFormatter';
import { getTokenLogoUrl } from 'lib/utils/tokenLogos';
import type { TokenQueryParams } from 'lib/types';
import styles from './TokenTable.module.css';
import { RefreshTokenButton } from './RefreshTokenButton';
import { useBulkRefresh } from '../hooks/useBulkRefresh';

interface TokenTableProps {
  filter?: 'all' | 'listed' | 'unlisted';
  limit?: number;
}

type SortField = TokenQueryParams['sort'];

export function TokenTable({ filter = 'all', limit = 100 }: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>('volume');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [copied, setCopied] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useDiscoveredTokens({
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
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { refreshMany, isRefreshing: isBulkRefreshing } = useBulkRefresh();

  const toggle = (addr: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(addr)) next.delete(addr); else next.add(addr);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(tokens.map(t => t.address)));
  };
  const clearAll = () => setSelected(new Set());
  const refreshSelected = async () => {
    if (selected.size === 0) return;
    await refreshMany(Array.from(selected));
    clearAll();
    refetch();
  };
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
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" onChange={(e) => e.target.checked ? selectAll() : clearAll()} />
                  {(selected.size > 0) && (
                    <button
                      className={styles.copyButton}
                      onClick={refreshSelected}
                      disabled={isBulkRefreshing}
                      title="Refresh selected tokens"
                    >
                      {isBulkRefreshing ? 'Refreshing…' : `Refresh Selected (${selected.size})`}
                    </button>
                  )}
                </div>
              </th>
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
            {tokens.map((token) => (
              <tr key={token.address}>
                <td>
                  <input type="checkbox" checked={selected.has(token.address)} onChange={() => toggle(token.address)} />
                </td>
                <td>
                  <div>
                    <Link to={`/tokens/${token.address}`} className={styles.tokenLink}>
                      <div className={styles.tokenInfo}>
                        <div className={styles.tokenIcon}>
                          <img 
                            src={getTokenLogoUrl(token.address, token.chainId)} 
                            alt={token.symbol} 
                            width={32} 
                            height={32}
                            onError={(e) => {
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
                    <div className={styles.addressRow}>
                      <code style={{ opacity: 0.7, fontSize: '12px' }}>{token.address.slice(0, 6)}...{token.address.slice(-4)}</code>
                      <button
                        className={styles.copyButton}
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          try {
                            await navigator.clipboard.writeText(token.address);
                            setCopied(token.address);
                            setTimeout(() => {
                              setCopied((curr) => (curr === token.address ? null : curr));
                            }, 1200);
                          } catch {}
                        }}
                        title="Copy contract address"
                      >
                        {copied === token.address ? 'Copied' : 'Copy'}
                      </button>
                      <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                        <RefreshTokenButton address={token.address} label="Refresh" />
                      </div>
                    </div>
                  </div>
                </td>
                <td title="24h trading volume from DEXs">{token.volume24h > 0 ? formatCurrency(token.volume24h) : 'N/A'}</td>
                <td title="Total Value Locked (TVL) in USD">{token.liquidity > 0 ? formatCurrency(token.liquidity) : 'N/A'}</td>
                <td title="Number of token holders">
                  {(() => {
                    const count = typeof token.holderCount === 'number' ? token.holderCount : Number(token.holderCount);
                    return (count > 0 && count < 1e10) ? count.toLocaleString() : 'N/A';
                  })()}
                </td>
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

