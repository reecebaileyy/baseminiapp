import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export function DiagnosticCheck() {
  const { address, isConnected, chain } = useAccount();
  const [hasAuthError, setHasAuthError] = useState(false);
  const [hasEthereumProvider, setHasEthereumProvider] = useState<boolean>(false);
  const [isMetaMask, setIsMetaMask] = useState<boolean>(false);

  useEffect(() => {
    // Detect ethereum provider and MetaMask
    try {
      const eth: any = (typeof window !== 'undefined' && (window as any).ethereum) ? (window as any).ethereum : undefined;
      setHasEthereumProvider(!!eth);
      setIsMetaMask(!!eth?.isMetaMask);
    } catch (_) {
      setHasEthereumProvider(false);
      setIsMetaMask(false);
    }

    // Listen for console errors to detect 401
    const originalError = console.error;
    console.error = (...args) => {
      const errorStr = JSON.stringify(args);
      if (errorStr.includes('401') || errorStr.includes('UNAUTHORIZED')) {
        setHasAuthError(true);
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '20px',
      margin: '20px 0',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      <h3 style={{ marginTop: 0, color: '#3b82f6' }}>🔍 Diagnostic Check</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Environment Variables:</strong>
        <ul style={{ marginLeft: '20px' }}>
          <li>
            API Key: {import.meta.env.VITE_ONCHAINKIT_API_KEY 
              ? '✅ Set' 
              : '❌ Missing'}
          </li>
          <li>
            Project ID: {import.meta.env.VITE_ONCHAINKIT_PROJECT_ID 
              ? `✅ Set (${import.meta.env.VITE_ONCHAINKIT_PROJECT_ID.substring(0, 8)}...)` 
              : '❌ Missing'}
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <strong>Wallet Status:</strong>
        <ul style={{ marginLeft: '20px' }}>
          <li>Ethereum Provider: {hasEthereumProvider ? '✅ Detected' : '❌ Not found'}</li>
          <li>MetaMask: {isMetaMask ? '✅ Detected' : '❌ Not detected'}</li>
          <li>Connected: {isConnected ? '✅ Yes' : '❌ No'}</li>
          <li>Address: {address ? `✅ ${address.substring(0, 6)}...${address.substring(38)}` : '❌ Not connected'}</li>
          <li>Chain: {chain ? `${chain.name} (${chain.id})` : '❌ Unknown'}</li>
          <li>Base Network: {chain?.id === 8453 ? '✅ Correct' : '❌ Wrong network (should be 8453)'}</li>
        </ul>
      </div>

      {hasAuthError && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '12px',
          color: '#ef4444'
        }}>
          <strong>🚨 401 AUTHENTICATION ERROR DETECTED</strong>
          <p style={{ margin: '8px 0' }}>Your API Key is <strong>invalid or expired</strong>.</p>
          <ol style={{ marginLeft: '20px', marginBottom: 0 }}>
            <li>Go to <a href="https://portal.cdp.coinbase.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Coinbase Developer Platform</a></li>
            <li>Generate a <strong>new API Key</strong></li>
            <li>Update <code>vite-project/.env</code> with the new key</li>
            <li>Restart dev server</li>
          </ol>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85em' }}>
            📖 See docs for detailed instructions
          </p>
        </div>
      )}

      {(!import.meta.env.VITE_ONCHAINKIT_API_KEY || !import.meta.env.VITE_ONCHAINKIT_PROJECT_ID) && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '12px',
          color: '#ef4444'
        }}>
          <strong>⚠️ Action Required:</strong>
          <ol style={{ marginLeft: '20px', marginBottom: 0 }}>
            <li>Create <code>.env</code> in the vite-project directory</li>
            <li>Add:
              <pre style={{ marginTop: '8px', padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px' }}>
{`VITE_ONCHAINKIT_API_KEY=your_key
VITE_ONCHAINKIT_PROJECT_ID=your_id`}
              </pre>
            </li>
            <li>Restart dev server: <code>npm run dev</code></li>
          </ol>
        </div>
      )}

      {chain?.id !== 8453 && isConnected && (
        <div style={{
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '12px',
          color: '#fbbf24'
        }}>
          <strong>⚠️ Wrong Network:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            Switch to Base network (Chain ID: 8453) in your wallet
          </p>
        </div>
      )}
    </div>
  );
}

