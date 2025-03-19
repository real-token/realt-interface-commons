import { DAI, ETH } from "./currency";
import { GnosisLogo } from "../../assets/chains/GnosisLogo";
import { EthereumLogo } from "../../assets";
import { Chain, ChainsConfig } from "../../types";

export enum ChainsID {
  // Example:
  Ethereum = 0x01,
  Gnosis = 0x64,
  Goerli = 0x05,
}

export const CHAINS: ChainsConfig<Chain> = {
  [ChainsID.Gnosis]: {
    chainId: ChainsID.Gnosis,
    chainName: "Gnosis Chain",
    logo: GnosisLogo,
    nativeCurrency: DAI,
    rpcUrl: "https://rpc.gnosischain.com",
    blockExplorerUrl: "https://gnosisscan.io/",
    isTestnet: false,
    contracts: {},
  },
  [ChainsID.Ethereum]: {
    chainId: ChainsID.Ethereum,
    chainName: "Ethereum",
    logo: EthereumLogo,
    nativeCurrency: ETH,
    rpcUrl: "https://rpc.ankr.com/eth",
    blockExplorerUrl: "https://etherscan.io/",
    isTestnet: false,
    contracts: {},
  },

  [ChainsID.Goerli]: {
    chainId: ChainsID.Goerli,
    chainName: "Goerli",
    logo: EthereumLogo,
    nativeCurrency: ETH,
    rpcUrl: "https://rpc.ankr.com/eth_goerli",
    blockExplorerUrl: "https://goerli.etherscan.io/",
    isTestnet: true,
    contracts: {},
  },
};

export const URLS = Object.keys(CHAINS).reduce<Record<number, string>>(
  (accumulator, chainId) => {
    accumulator[Number(chainId)] = CHAINS[Number(chainId) as ChainsID].rpcUrl;
    return accumulator;
  },
  {}
);

export const ALLOWED_CHAINS = Object.keys(URLS).map((chainId) =>
  Number(chainId)
);

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
