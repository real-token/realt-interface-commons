import { useMemo } from "react";
import { Chain, ChainSelectConfig } from "../../types";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";

export function useActiveChain<T extends Partial<Chain>>(chainConfig: ChainSelectConfig<T>): T|undefined {
    const { chainId } = useWeb3ModalAccount();
    return useMemo(() => chainId ? chainConfig.chainsConfig[chainId] : undefined,[chainConfig.chainsConfig, chainId]);
};