import { FC } from "react";
import { Currency } from "../config";
import { Contracts } from "./contract";

export type Chain = {
    chainId: number;
    chainName: string;
    logo: FC<any>;
    nativeCurrency: Currency;
    rpcUrl: string;
    blockExplorerUrl: string;
    isTestnet: boolean;
    contracts: Contracts;
};

export type ChainsConfig<T> = Record<number,T>;
  
export type ChainSelectConfig<T> = {
    allowedChains: number[];
    chainsConfig: ChainsConfig<T>
}

export const parseAllowedChain = (allowedChains: any): number[] => {
    const parsedAllowedChains: number[] = [];
    Object.keys(allowedChains).forEach((type) => {
      if(typeof allowedChains[type]  == 'number') parsedAllowedChains.push(allowedChains[type])
    });
    return parsedAllowedChains;
  }