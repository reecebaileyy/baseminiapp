import { useRefreshToken } from '../hooks/useRefreshToken';

interface RefreshTokenButtonProps {
  address: string;
  secret?: string; // optional header if required
  className?: string;
  label?: string;
}

export function RefreshTokenButton({ address, secret, className, label }: RefreshTokenButtonProps) {
  const { refresh, isRefreshing, error, result } = useRefreshToken(address);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }} className={className}>
      <button
        onClick={() => refresh({ secret })}
        disabled={isRefreshing}
        style={{
          padding: '6px 10px',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.06)',
          color: 'rgba(255,255,255,0.9)',
          fontSize: 12,
          cursor: isRefreshing ? 'not-allowed' : 'pointer',
        }}
        title="Refresh token stats"
      >
        {isRefreshing ? 'Refreshing…' : (label || 'Refresh')}
      </button>
      {result ? (
        <span style={{ opacity: 0.6, fontSize: 12 }}>✓ {Math.round(result.durationMs)}ms</span>
      ) : error ? (
        <span style={{ color: '#ef4444', fontSize: 12 }}>Failed</span>
      ) : null}
    </div>
  );
}


