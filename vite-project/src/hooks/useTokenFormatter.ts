import { useMemo } from 'react';

/**
 * Token Formatter Hook
 * 
 * Provides consistent formatting utilities for token data:
 * - Currency with humanized numbers ($690.68M, $3.92K, N/A)
 * - Numbers without currency
 * - Time ago formatting (7m ago, 3h ago)
 * - Address truncation (0x1234...5678)
 */

interface TokenFormatter {
  formatCurrency: (value: number | null | undefined) => string;
  formatNumber: (value: number | null | undefined) => string;
  formatTimeAgo: (timestamp: number) => string;
  formatAddress: (address: string) => string;
  formatPercent: (value: number | null | undefined) => string;
}

/**
 * Format currency with humanized abbreviations
 * @param value - Currency value in USD
 * @returns Formatted string like "$690.68M", "$3.92K", or "N/A"
 */
function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  if (value === 0) {
    return '$0.00';
  }

  const absValue = Math.abs(value);

  // Billions
  if (absValue >= 1e9) {
    const formatted = (value / 1e9).toFixed(2);
    return `$${formatted}B`;
  }

  // Millions
  if (absValue >= 1e6) {
    const formatted = (value / 1e6).toFixed(2);
    return `$${formatted}M`;
  }

  // Thousands
  if (absValue >= 1e3) {
    const formatted = (value / 1e3).toFixed(2);
    return `$${formatted}K`;
  }

  // Less than 1000
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with humanized abbreviations (no currency symbol)
 */
function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  if (value === 0) {
    return '0';
  }

  const absValue = Math.abs(value);

  if (absValue >= 1e9) {
    const formatted = (value / 1e9).toFixed(2);
    return `${formatted}B`;
  }

  if (absValue >= 1e6) {
    const formatted = (value / 1e6).toFixed(2);
    return `${formatted}M`;
  }

  if (absValue >= 1e3) {
    const formatted = (value / 1e3).toFixed(2);
    return `${formatted}K`;
  }

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format timestamp as time ago
 * @param timestamp - Unix timestamp in seconds or milliseconds
 * @returns Formatted string like "7m ago", "3h ago", "2d ago"
 */
function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  
  // Handle both seconds and milliseconds
  const time = timestamp < 1e10 ? timestamp * 1000 : timestamp;
  const diff = now - time;

  if (diff < 0) {
    return 'Just now';
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years}y ago`;
  }
  if (months > 0) {
    return `${months}mo ago`;
  }
  if (weeks > 0) {
    return `${weeks}w ago`;
  }
  if (days > 0) {
    return `${days}d ago`;
  }
  if (hours > 0) {
    return `${hours}h ago`;
  }
  if (minutes > 0) {
    return `${minutes}m ago`;
  }
  
  return 'Just now';
}

/**
 * Format address with truncation
 * @param address - Ethereum address
 * @param startChars - Characters to show at start (default: 6)
 * @param endChars - Characters to show at end (default: 4)
 * @returns Truncated address like "0x1234...5678"
 */
function formatAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length < startChars + endChars) {
    return address;
  }

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format percentage with sign
 */
function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  const formatted = value.toFixed(2);
  const sign = value > 0 ? '+' : '';
  
  return `${sign}${formatted}%`;
}

/**
 * Custom hook for token data formatting
 * @returns Formatter functions
 */
export function useTokenFormatter(): TokenFormatter {
  return useMemo(
    () => ({
      formatCurrency,
      formatNumber,
      formatTimeAgo,
      formatAddress,
      formatPercent,
    }),
    []
  );
}

// Export individual functions for direct use
export { formatCurrency, formatNumber, formatTimeAgo, formatAddress, formatPercent };
