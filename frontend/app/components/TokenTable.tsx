'use client';

import { useState } from 'react';
import { TokenWithMetrics } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './TokenTable.module.css';

interface TokenTableProps {
  tokens: TokenWithMetrics[];
  isLoading?: boolean;
}

type SortField = 'volume' | 'liquidity' | 'holders' | 'marketcap' | 'created';
type SortOrder = 'asc' | 'desc';

export function TokenTable({ tokens, isLoading }: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    let aVal: number;
    let bVal: number;

    switch (sortField) {
      case 'volume':
        aVal = a.volume24h;
        bVal = b.volume24h;
        break;
      case 'liquidity':
        aVal = a.liquidity;
        bVal = b.liquidity;
        break;
      case 'holders':
        aVal = a.holderCount;
        bVal = b.holderCount;
        break;
      case 'marketcap':
        aVal = a.marketCap;
        bVal = b.marketCap;
        break;
      case 'created':
        aVal = a.createdAt;
        bVal = b.createdAt;
        break;
      default:
        return 0;
    }

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Scanning for tokens...</p>
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
                Volume 24h {sortField === 'volume' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('liquidity')} className={styles.sortable}>
                Liquidity {sortField === 'liquidity' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('holders')} className={styles.sortable}>
                Holders {sortField === 'holders' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('marketcap')} className={styles.sortable}>
                Market Cap {sortField === 'marketcap' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Price Change</th>
              <th onClick={() => handleSort('created')} className={styles.sortable}>
                Age {sortField === 'created' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens.map((token, index) => (
              <tr key={token.address}>
                <td>{index + 1}</td>
                <td>
                  <Link href={`/tokens/${token.address}`} className={styles.tokenLink}>
                    <div className={styles.tokenInfo}>
                      <div className={styles.tokenIcon}>
                        {token.logoURI ? (
                          <Image src={token.logoURI} alt={token.symbol} width={32} height={32} />
                        ) : (
                          <div className={styles.placeholder}>{token.symbol[0]}</div>
                        )}
                      </div>
                      <div>
                        <div className={styles.tokenName}>{token.name}</div>
                        <div className={styles.tokenSymbol}>{token.symbol}</div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td>{formatNumber(token.volume24h)}</td>
                <td>{formatNumber(token.liquidity)}</td>
                <td>{token.holderCount.toLocaleString()}</td>
                <td>{formatNumber(token.marketCap)}</td>
                <td className={token.priceChange24h >= 0 ? styles.positive : styles.negative}>
                  {token.priceChange24h >= 0 ? '+' : ''}
                  {token.priceChange24h.toFixed(2)}%
                </td>
                <td>{formatTime(token.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

