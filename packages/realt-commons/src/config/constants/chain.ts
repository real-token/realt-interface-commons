import { ContractsID } from './contract';
import { Contracts } from '../../types/contract';
import { Currency } from './currency';

export enum ChainsID {
  // Example:
  // Ethereum = 0x01,
}

export type Chain = {
  chainId: ChainsID;
  chainName: string;
  logo: string;
  nativeCurrency: Currency;
  rpcUrl: string;
  blockExplorerUrl: string;
  contracts: Contracts;
};

export const CHAINS: Record<ChainsID, Chain> = {
  // Exemple: 
  // [ChainsID.Ethereum]: {
  //   chainId: ChainsID.Ethereum,
  //   chainName: 'Ethereum',
  //   logo: EthereumSVG.src,
  //   nativeCurrency: ETH,
  //   rpcUrl: 'https://rpc.ankr.com/eth',
  //   blockExplorerUrl: 'https://etherscan.io/',
  //   contracts: {
  //     [ContractsID.realTokenYamUpgradeable]: {
  //       abi: realTokenYamUpgradeableABI,
  //       address: '0xc759aa7f9dd9720a1502c104dae4f9852bb17c14',
  //       metadata: { fromBlock: 16220000 },
  //     },
  //   },
  // },
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

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
