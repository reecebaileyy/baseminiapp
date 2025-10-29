import { useState } from 'react';
import { BuyWidget } from '../components/BuyWidget';
import { SwapWidget } from '../components/SwapWidget';
import { DiagnosticCheck } from '../components/DiagnosticCheck';
import { Navigation } from '../components/Navigation';
import styles from './page.module.css';

export default function Trade() {
  const [activeTab, setActiveTab] = useState<'swap' | 'buy'>('swap');

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Trade</h1>
        <p className={styles.subtitle}>
          {activeTab === 'swap'
            ? 'Swap tokens with best prices across DEXs'
            : 'Buy crypto with credit card, Apple Pay, or Coinbase'
          }
        </p>
      </div>

      <div className={styles.content}>
        {/* Diagnostic Check */}
        <DiagnosticCheck />

        {/* Tab Switcher */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'swap' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('swap')}
          >
            <span className={styles.tabIcon}>🔄</span>
            Swap
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'buy' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            <span className={styles.tabIcon}>💳</span>
            Buy
          </button>
        </div>

        <div className={styles.widgetContainer}>
          {activeTab === 'swap' ? (
            <SwapWidget />
          ) : (
            <BuyWidget />
          )}
        </div>

        <div className={styles.info}>
          {activeTab === 'swap' ? (
            <>
              <div className={styles.infoCard}>
                <h3>🔒 MEV Protected</h3>
                <p>Your trades are simulated before execution to prevent frontrunning</p>
              </div>
              <div className={styles.infoCard}>
                <h3>💰 Best Prices</h3>
                <p>Powered by 0x Aggregator to find optimal rates across all Base DEXs</p>
              </div>
              <div className={styles.infoCard}>
                <h3>⚡ Fast Execution</h3>
                <p>Direct DEX integration ensures instant access to new tokens</p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.infoCard}>
                <h3>💳 Multiple Payment Options</h3>
                <p>Pay with credit card, Apple Pay, or your Coinbase account</p>
              </div>
              <div className={styles.infoCard}>
                <h3>🚀 Instant Delivery</h3>
                <p>Crypto delivered directly to your wallet in seconds</p>
              </div>
              <div className={styles.infoCard}>
                <h3>🔐 Secure & Compliant</h3>
                <p>Powered by Coinbase with industry-leading security</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

