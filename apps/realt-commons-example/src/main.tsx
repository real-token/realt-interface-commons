import React from 'react'
import ReactDOM from 'react-dom/client'
import { Flex } from '@mantine/core';
import App from './App'
import './index.css'
import { 
  ChainSelectConfig, Logo, RealtProvider, 
  Website, initLanguage, getConnectors, parseAllowedChain, 
  Web3Providers, MantineProviders, Layout, LanguageInit,
  getWalletConnectV2, metaMask, metaMaskHooks, gnosisHooks, 
  gnosisSafe, getReadOnlyConnector,
  getRealtAAConnector,
} from "@realtoken/realt-commons";
import { ChainConfig, TorusConfig, AAClientConfig } from '@real-token/web3-react-aa';

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
const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2(customChains, env, 'ff2eff6eb19b6b79a24bbc47c46b6035', showAllNetworks);
const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);



const INFURA_KEY = import.meta.env.VITE_INFURA_KEY;
if(!INFURA_KEY) {
  throw new Error("infuraKey is not set")
}

const TORUS_KEY = import.meta.env.VITE_TORUS_API_KEY;
if(!TORUS_KEY) {
  throw new Error("torusKey is not set")
}
const ETHERSPOT_KEY = import.meta.env.VITE_ETHERSPOT_KEY;
if(!ETHERSPOT_KEY) {
  throw new Error("etherspotKey is not set")
}
const WC_PROJECTID = import.meta.env.VITE_WC_PROJECTID;
if(!WC_PROJECTID) {
  throw new Error("WALLET_CONNECT_PROJECT_ID is not set")
}

const networks: ChainConfig[] = [
    {
      wsTarget: "wss://sepolia.infura.io/ws/v3/" + INFURA_KEY, 
      rpcTarget: "https://goerli.infura.io/v3/" + INFURA_KEY,
      blockExplorer: "https://sepolia.etherscan.io/",
      chainId: "0xaa36a7",
      displayName: "sepolia",
      chainNamespace: "eip155",
      ticker: "ETH",
      tickerName: "Sepolia ETH",
    },
    {
      wsTarget: "wss://goerli.infura.io/ws/v3/" + INFURA_KEY, 
      rpcTarget: "https://goerli.infura.io/v3/" + INFURA_KEY,
      blockExplorer: "https://goerli.etherscan.io/",
      chainId: "0x5",
      displayName: "goerli",
      ticker: "ETH",
      tickerName: "Göerli ETH",
      chainNamespace: "eip155",
    },
];

const torusConfig: TorusConfig = {
  build: "production",
  mfaLevel: "optional", // TODO en parler à web3auth
  networks,
  loginConfig: {
    weibo: {
      name: 'weibo',
      typeOfLogin: 'weibo',
      showOnModal: false
    },
    kakao: {
      name: 'kakao',
      typeOfLogin: 'kakao',
      showOnModal: false
    }
  },
  enableLogging: true,
};
  
const config: AAClientConfig = {
  uiConfig: {
    appName: "RealToken",
    appUrl: "https://realt.co",
    defaultLanguage: "en",
    mode: "dark",
    theme: {
      // TODO theme dark and light
      dark: {
        error: "#ff0000",
        gray: "#3a0ed7",
        green: "#115417",
        red: "#5b0000",
        success: "#25dc65",
        warning: "#ff9100",
        white: "#00ff62",
        info: "#025590",
        primary: "#2439d5",
        secondary: "#5b0000",
        secondary2: "#d05c04",
        text: "#0F1222",
        // "v-card": "#5b0000",
        // "v-sheet": "#2439d5",
        // "v-item-group": "#ff0000",
        // "theme--dark": "#ff0000",
        // "note-list__icon": "#ffffff",
        "v-icon__component": "#ffffff",
        "torusBrand1--text": "#ffffff",
        "v-icon": "#ffffff",
        "v-expansion-panels": "#ff0000",
        torusBtn1: "#0F1222",
        torusBrand1: "#ff9100",
        torusBrand2: "#002cb1",
        torusBrand3: "#b100ab",
        torusBrand4: "#fffb00",
        torusGray1: "#00d0ff",
        torusGray2: "#ff0000",
        torusGray3: "#ff0000",
        torusGray4: "#ff0000",
        torusFont1: "#d80fc7",
        torusFont2: "#bb73b5",
        torusFontLink_1: "#00f7ff",
        torusFontLink_2: "#ffbb00",
        torusBlack: "#af7272",
        torusBlack2: "#4a3737",
        infoBannerText: "#4a3737",
        infoBanner: "#4a3737",
        torusLight: "#221414",
        torusBrandHover: "#d05c04",
        text_1: "#15ce5f",
        text_2: "#092226",
        text_3: "#0650d1",
        background: "#0f20d8",
        disabled: "#221414"
      },
      light: {
        error: "#ff0000",
        gray: "#111ed9",
        green: "#115417",
        red: "#5b0000",
        success: "#25dc65",
        warning: "#ff9100",
        white: "#00ff62",
        info: "#025590",
        primary: "#2439d5",
        secondary: "#5b0000",
        secondary2: "#d05c04",
        text: "#0F1222",
        infoBannerText: "#4a3737",
        infoBanner: "#4a3737",
        torusBtn1: "#0F1222",
        "v-card": "#5b0000",
        torusBrand1: "#ff9100",
        torusBrand2: "#002cb1",
        torusBrand3: "#b100ab",
        torusBrand4: "#fffb00",
        torusGray1: "#00d0ff",
        torusGray2: "#ff0000",
        torusGray3: "#ff0000",
        torusGray4: "#ff0000",
        torusFont1: "#d80fc7",
        torusFont2: "#bb73b5",
        torusFontLink_1: "#00f7ff",
        torusFontLink_2: "#ffbb00",
        torusBlack: "#d30909",
        torusBlack2: "#4a3737",
        torusLight: "#221414",
        background: "#0f20d8",
        text_1: "#15ce5f",
        text_2: "#092226",
        text_3: "#0650d1",
        disabled: "#221414",
        torusBrandHover: "#d05c04"
      },
    },
    loginGridCol: 3,
    primaryButton: "socialLogin",
    logoLight: "https://realt.co/wp-content/uploads/2019/04/RealT_Logo.svg",
    logoDark: "https://realt.co/wp-content/uploads/2019/04/RealT_Logo.svg",
  },
  web3auth: {
    apiKey: TORUS_KEY,
    network: "sapphire_mainnet",
  },
  chainIdHex: "0x5" /* 11155111 */,
  etherspotApiKey: ETHERSPOT_KEY,
  torusConfig: torusConfig,
  walletconnect: {
    projectId: WC_PROJECTID,
    relayUrl: "wss://relay.walletconnect.com",
    name: "RealT Wallet",
    description: "RealT account abstraction wallet",
    icons: ["https://avatars.githubusercontent.com/u/53057739"],
    url: "http://localhost:3000/"
  },
};

const [realtAA, realtAAHooks] = getRealtAAConnector(config);

const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks],
  realtAA: [realtAA, realtAAHooks]
});

console.log('libraryConnectors: ', libraryConnectors)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RealtProvider 
      value={{
        env: env,
        showAllNetworks: showAllNetworks,
        enableRealtAAConnector: true
      }}
    >
      <Web3Providers libraryConnectors={libraryConnectors}>
        <MantineProviders>
            <LanguageInit i={i18n} />
            <Layout 
              newWebsite={newWebsite} 
              chains={customChains}
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
      </Web3Providers>
    </RealtProvider>
  </React.StrictMode>,
)