"use client";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function RootProvider({ children }: { children: ReactNode }) {
  // Debug logging
  console.log('RootProvider - API Key exists:', !!process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY);
  console.log('RootProvider - Project ID exists:', !!process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID);
  console.log('RootProvider - Project ID value:', process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID);
  
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      config={{
        appearance: {
          mode: "auto",
        },
        wallet: {
          display: "modal",
          preference: "all",
        },
      }}
      miniKit={{
        enabled: true,
        autoConnect: true,
        notificationProxyUrl: undefined,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </OnchainKitProvider>
  );
}
