import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChainSelectConfig, Websites, initLanguage, parseAllowedChain } from "realt-commons";
import { Web3Providers, MantineProviders, Layout, LanguageInit } from "realt-commons";
import { ModalsProvider } from "@mantine/modals";
import { CUSTOM_ALLOWED_CHAINS, ChainsID, CustomChain } from './constants/chain';

const i18n = initLanguage();

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CUSTOM_ALLOWED_CHAINS
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ModalsProvider>
        <Web3Providers>
          <MantineProviders>
              <LanguageInit i={i18n}/>
              <Layout currentWebsite={Websites.EXAMPLE} chains={customChains}>
                <App />
              </Layout>
          </MantineProviders>
        </Web3Providers>
      </ModalsProvider>
  </React.StrictMode>,
)