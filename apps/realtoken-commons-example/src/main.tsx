import React from 'react'
import ReactDOM from 'react-dom/client'
import { Flex } from '@mantine/core';
import App from './App'
import './index.css'
import { 
  ChainSelectConfig, Logo, RealtokenProvider, Website, initLanguage, parseAllowedChain, parseChainConfigsToWeb3Modal,
  MantineProviders, Layout, LanguageInit, initWeb3Modal
} from "@real-token/commons";
import { CUSTOM_ALLOWED_CHAINS, ChainsID, CustomChain } from './constants/chain';
import { resources } from './i18next/locales';
import { NavMenu } from './components/NavMenu';
import '@mantine/core/styles.css';

export const i18n = initLanguage(resources);

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CUSTOM_ALLOWED_CHAINS,
  defaultChainId: ChainsID.Gnosis
}

const newWebsite: Website = {
  name: "RealT-commons example",
  comingSoon: false,
  url: "https://localhost:3000",
  logo: Logo
}

const showAllNetworks = true;
const env = import.meta.env.MODE;
console.log('ENV: ', env)

const supportedNetworks = parseChainConfigsToWeb3Modal<CustomChain>(Object.values(customChains.chainsConfig));

initWeb3Modal({
  metadata: {
    name: 'RealT-commons example',
    description: 'RealT-commons example',
    url: 'https://localhost:3000',
    icons: []
  },
  supportedNetworks,
  walletConnectProjectId: 'ff2eff6eb19b6b79a24bbc47c46b6035'
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RealtokenProvider 
      value={{
        env: env,
        showAllNetworks: showAllNetworks,
        chainConfig: customChains,
      }}
    >
      <MantineProviders>
          <LanguageInit i={i18n} />
          <Layout 
            newWebsite={newWebsite} 
            headerNav={<NavMenu/>}
            footerCustomLinks={
              <Flex>
                <div>{'test'}</div>
              </Flex>
            }
          >
            <App />
          </Layout>
      </MantineProviders>
    </RealtokenProvider>
  </React.StrictMode>,
)