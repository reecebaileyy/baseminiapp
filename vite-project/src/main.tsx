import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@coinbase/onchainkit/styles.css';
import App from './App.tsx'
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';


createRoot(document.getElementById('root')!).render(
  <OnchainKitProvider
      apiKey = {import.meta.env.VITE_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'auto', // 'light' | 'dark' | 'auto'
        },
        wallet: {
          display: 'modal', // 'modal' | 'drawer'
          preference: 'all', // 'all' | 'smartWalletOnly' | 'eoaOnly'
        },
      }}
      miniKit={{
        enabled: true,
        autoConnect: true,
      }}
    >
  <StrictMode>
    <App />
  </StrictMode>
  </OnchainKitProvider>
)
