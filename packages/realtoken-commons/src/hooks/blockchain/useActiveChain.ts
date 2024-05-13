import { useMemo } from "react";
import { useWeb3React } from '@web3-react/core';
import { Chain, ChainSelectConfig } from "../../types";

export function useActiveChain<T extends Partial<Chain>>(chainConfig: ChainSelectConfig<T>): T|undefined {
    const { chainId } = useWeb3React();
    return useMemo(() => chainId ? chainConfig.chainsConfig[chainId] : undefined,[chainConfig.chainsConfig, chainId]);
};