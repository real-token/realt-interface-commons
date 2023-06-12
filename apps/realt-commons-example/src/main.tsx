import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChainSelectConfig, Logo, RealtProvider, Website, initLanguage, parseAllowedChain } from "@realtoken/realt-commons";
import { Web3Providers, MantineProviders, Layout, LanguageInit } from "@realtoken/realt-commons";
import { ModalsProvider } from "@mantine/modals";
import { CUSTOM_ALLOWED_CHAINS, ChainsID, CustomChain } from './constants/chain';
import { resources } from './i18next/locales';
import { NavMenu } from './components/NavMenu';

export const i18n = initLanguage(resources);

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
    <RealtProvider.Provider value={{
      env: import.meta.env.MODE
    }}>
      <ModalsProvider>
        <Web3Providers>
          <MantineProviders>
              <LanguageInit i={i18n} />
              <Layout 
                newWebsite={newWebsite} 
                chains={customChains}
                headerNav={<NavMenu/>
              }
              >
                <App />
              </Layout>
          </MantineProviders>
        </Web3Providers>
      </ModalsProvider>
    </RealtProvider.Provider>
  </React.StrictMode>,
)