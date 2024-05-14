import { Chain, DAI, ETH, EthereumLogo, GnosisLogo } from "@real-token/commons";

export enum ChainsID {
    Ethereum = 0x01,
    Gnosis = 0x64,
}
  
export type CustomChain = Chain & {
  test: boolean;
} 

export const CUSTOM_ALLOWED_CHAINS: Record<ChainsID,CustomChain> = {
  [ChainsID.Gnosis]: {
    chainId: ChainsID.Gnosis,
    chainName: 'Gnosis Chain',
    logo: GnosisLogo,
    nativeCurrency: DAI,
    rpcUrl: 'https://rpc.ankr.com/gnosis',
    blockExplorerUrl: 'https://gnosisscan.io/',
    isTestnet: false,
    test: true,
    contracts: {}
  },
  [ChainsID.Ethereum]: {
    chainId: ChainsID.Ethereum,
    chainName: 'Ethereum',
    logo: EthereumLogo,
    nativeCurrency: ETH,
    rpcUrl: 'https://rpc.ankr.com/eth',
    blockExplorerUrl: 'https://etherscan.io/',
    isTestnet: false,
    test: false,
    contracts: {}
  }
};

export const URLS = Object.keys(CUSTOM_ALLOWED_CHAINS).reduce<Record<number, string>>(
    (accumulator, chainId) => {
      accumulator[Number(chainId)] = CUSTOM_ALLOWED_CHAINS[Number(chainId) as ChainsID].rpcUrl;
      return accumulator;
    },
    {}
);

export const ALLOWED_CHAINS = Object.keys(URLS).map((chainId) =>
  Number(chainId)
);