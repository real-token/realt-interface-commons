import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChainSelectConfig, Logo, Website, initLanguage, parseAllowedChain } from "@realtoken/realt-commons";
import { Web3Providers, MantineProviders, Layout, LanguageInit } from "@realtoken/realt-commons";
import { Button } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { CUSTOM_ALLOWED_CHAINS, ChainsID, CustomChain } from './constants/chain';

const i18n = initLanguage();

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CUSTOM_ALLOWED_CHAINS
}

const newWebsite: Website = {
  name: "RealT-commons example",
  comingSoon: false,
  url: "https://localhost:3000",
  logo: Logo
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ModalsProvider>
        <Web3Providers>
          <MantineProviders>
              <LanguageInit i={i18n}/>
              <Layout 
                newWebsite={newWebsite} 
                chains={customChains}
                headerNav={
                  <>
                    <Button>Menu 1</Button>
                    <Button>Menu 2</Button>
                  </>
                }
              >
                <App />
              </Layout>
          </MantineProviders>
        </Web3Providers>
      </ModalsProvider>
  </React.StrictMode>,
)