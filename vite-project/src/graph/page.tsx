import { useEffect, useState } from 'react';
import { GetPoolManagersDocument, execute } from '../../.graphclient';
import type { GetPoolManagersQuery } from '../../.graphclient';
import { Navigation } from '../components/Navigation';
import styles from './page.module.css';

export default function GraphPage() {
  const [data, setData] = useState<GetPoolManagersQuery>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await execute(GetPoolManagersDocument, {});
        setData(result?.data as GetPoolManagersQuery);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching GraphQL data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Graph Client Test</h1>
        <p className={styles.subtitle}>
          Testing The Graph query with Uniswap V4 Base subgraph
        </p>
      </div>

      <div className={styles.content}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading data from The Graph...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <h3>Error</h3>
            <p>{error}</p>
            <button 
              className={styles.retryBtn}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {data && !loading && (
          <div className={styles.dataContainer}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Pool Managers</h2>
              <div className={styles.grid}>
                {data.poolManagers && data.poolManagers.length > 0 ? (
                  data.poolManagers.map((manager) => (
                    <div key={manager.id} className={styles.card}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardLabel}>ID</span>
                        <span className={styles.cardValue}>{manager.id}</span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Pool Count</span>
                        <span className={styles.cardValue}>{manager.poolCount}</span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Transaction Count</span>
                        <span className={styles.cardValue}>{manager.txCount}</span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>Total Volume (USD)</span>
                        <span className={styles.cardValue}>
                          ${parseFloat(manager.totalVolumeUSD || '0').toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.empty}>No pool managers found</p>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Bundles</h2>
              <div className={styles.grid}>
                {data.bundles && data.bundles.length > 0 ? (
                  data.bundles.map((bundle) => (
                    <div key={bundle.id} className={styles.card}>
                      <div className={styles.cardHeader}>
                        <span className={styles.cardLabel}>ID</span>
                        <span className={styles.cardValue}>{bundle.id}</span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.cardLabel}>ETH Price (USD)</span>
                        <span className={styles.cardValue}>
                          ${parseFloat(bundle.ethPriceUSD || '0').toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.empty}>No bundles found</p>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Raw JSON Data</h2>
              <pre className={styles.json}>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
