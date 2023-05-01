import { Chain, Contracts, Currency, DAI, ETH, EthereumLogo, GnosisLogo } from "@realtoken/realt-commons";
import { FC } from "react";

export enum ChainsID {
    Ethereum = 0x01,
    Gnosis = 0x64,
    localhost_foreign = 0x539,
    localhost_home = 0x7a69
}
  
export type CustomChain = Omit<Chain,'blockExplorerUrl'> & {
    chainId: ChainsID;
    chainName: string;
    logo: FC<any>;
    nativeCurrency: Currency;
    rpcUrl: string;
    blockExplorerUrl?: string;
    contracts: Contracts;
} 

export const CUSTOM_ALLOWED_CHAINS: Record<ChainsID,CustomChain> = {
    [ChainsID.Gnosis]: {
      chainId: ChainsID.Gnosis,
      chainName: 'Gnosis Chain',
      logo: GnosisLogo,
      nativeCurrency: DAI,
      rpcUrl: 'https://rpc.ankr.com/gnosis',
      blockExplorerUrl: 'https://gnosisscan.io/',
      contracts: {},
    },
    [ChainsID.Ethereum]: {
      chainId: ChainsID.Ethereum,
      chainName: 'Ethereum',
      logo: EthereumLogo,
      nativeCurrency: ETH,
      rpcUrl: 'https://rpc.ankr.com/eth',
      blockExplorerUrl: 'https://etherscan.io/',
      contracts: {},
    },

    // TEST
    [ChainsID.localhost_home]: {
        chainId: ChainsID.localhost_home,
        chainName: 'Localhost Home',
        logo: GnosisLogo,
        nativeCurrency: DAI,
        rpcUrl: 'https://rpc.ankr.com/eth',
        contracts: {},
      },
      [ChainsID.localhost_foreign]: {
        chainId: ChainsID.localhost_foreign,
        chainName: 'Localhost Foreign',
        logo: EthereumLogo,
        nativeCurrency: ETH,
        rpcUrl: 'https://rpc.ankr.com/eth',
        contracts: {},
      },
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