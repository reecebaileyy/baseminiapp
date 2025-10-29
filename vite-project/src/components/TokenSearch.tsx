import { useState } from 'react';
import { useTokenByAddress } from '../hooks/useGraphToken';
import styles from './TokenSearch.module.css';

interface TokenSearchProps {
  onTokenSelect?: (tokenAddress: string) => void;
}

export function TokenSearch({ onTokenSelect }: TokenSearchProps) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState<string | undefined>();
  
  const { data: token, isLoading, error } = useTokenByAddress(searchAddress);

  const handleSearch = () => {
    if (tokenAddress.trim()) {
      const address = tokenAddress.trim().toLowerCase();
      setSearchAddress(address);
      if (onTokenSelect) {
        onTokenSelect(address);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter token contract address (0x...)"
          className={styles.input}
        />
        <button 
          onClick={handleSearch}
          className={styles.searchButton}
          disabled={isLoading || !tokenAddress.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          Token not found or error occurred: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}

      {token && !error && (
        <div className={styles.tokenInfo}>
          <h3>{token.symbol || 'Unknown'}</h3>
          <p className={styles.tokenName}>{token.name || 'Unknown Token'}</p>
          <div className={styles.tokenDetails}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Address:</span>
              <span className={styles.value}>{token.id}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Total Supply:</span>
              <span className={styles.value}>
                {parseFloat(token.totalSupply || '0').toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Decimals:</span>
              <span className={styles.value}>{token.decimals?.toString() || '0'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

