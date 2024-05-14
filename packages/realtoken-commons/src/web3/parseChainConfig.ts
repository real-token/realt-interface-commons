import { Chain as RealtokenChain } from "../types"
import type { Chain} from '@web3modal/scaffold-utils/ethers';

export const parseChainConfigsToWeb3Modal = <T extends RealtokenChain>(chains: T[]): Chain[] => {
    return Object.values(chains).map((chain) => parseChainConfigToWeb3Modal(chain))
}

export const parseChainConfigToWeb3Modal = <T extends RealtokenChain>(chain: T): Chain => {
    return {
        chainId: chain.chainId ?? 1,
        name: chain.chainName ?? "Unknown",
        rpcUrl: chain.rpcUrl ?? "",
        explorerUrl: chain.blockExplorerUrl ?? "",
        currency: chain.nativeCurrency.symbol ?? "",
    }
}