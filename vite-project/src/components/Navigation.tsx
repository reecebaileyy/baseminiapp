import { Link, useLocation } from 'react-router-dom';
import { Wallet } from '@coinbase/onchainkit/wallet';
import styles from './Navigation.module.css';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <div className={styles.navLinks}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/graph" 
              className={`${styles.navLink} ${location.pathname === '/graph' ? styles.active : ''}`}
            >
              Index
            </Link>
            <Link 
              to="/trade" 
              className={`${styles.navLink} ${location.pathname === '/trade' ? styles.active : ''}`}
            >
              Trade
            </Link>
          </div>
        </div>
        
        <div className={styles.navRight}>
          <Wallet />
        </div>
      </div>
    </nav>
  );
}

