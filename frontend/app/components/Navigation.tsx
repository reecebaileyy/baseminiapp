'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet } from '@coinbase/onchainkit/wallet';
import styles from './Navigation.module.css';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLeft}>
          <div className={styles.navLinks}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
            >
              Scanner
            </Link>
            <Link 
              href="/trade" 
              className={`${styles.navLink} ${pathname === '/trade' ? styles.active : ''}`}
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

