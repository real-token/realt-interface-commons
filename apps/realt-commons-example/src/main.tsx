import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChainSelectConfig, Logo, RealtProvider, Website, initLanguage, getConnectors, parseAllowedChain, getWalletConnectV2, metaMask, metaMaskHooks, gnosisSafe, gnosisHooks } from "@realtoken/realt-commons";
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

const env = import.meta.env.MODE;
console.log('ENV: ', env)
const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2(customChains,env, 'ff2eff6eb19b6b79a24bbc47c46b6035');

const libraryConnectors = getConnectors(
  [metaMask, metaMaskHooks],
  [gnosisSafe, gnosisHooks],
  [walletConnectV2, walletConnectV2Hooks]
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RealtProvider 
      value={{
        env: env,
      }}
    >
      <ModalsProvider>
        <Web3Providers libraryConnectors={libraryConnectors}>
          <MantineProviders>
              <LanguageInit i={i18n} />
              <Layout 
                newWebsite={newWebsite} 
                chains={customChains}
                headerNav={<NavMenu/>
              }>
                <App />
              </Layout>
          </MantineProviders>
        </Web3Providers>
      </ModalsProvider>
    </RealtProvider>
  </React.StrictMode>,
)