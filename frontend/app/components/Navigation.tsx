'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link 
        href="/" 
        className={pathname === '/' ? styles.active : ''}
      >
        Home
      </Link>
      <Link 
        href="/dashboard" 
        className={pathname === '/dashboard' ? styles.active : ''}
      >
        Scanner
      </Link>
      <Link 
        href="/trade" 
        className={pathname === '/trade' ? styles.active : ''}
      >
        Trade
      </Link>
    </nav>
  );
}

