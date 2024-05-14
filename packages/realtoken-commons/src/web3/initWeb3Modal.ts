import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import type { Metadata, ProviderType, Chain } from '@web3modal/scaffold-utils/ethers';

interface Web3ModalOptions {
    walletConnectProjectId: string,
    supportedNetworks: any,
    metadata: Metadata,
    enableEIP6963?: boolean,
    enableInjected?: boolean,
    enableCoinbase?: boolean,
    enableAnalytics?: boolean
}
export const initWeb3Modal = ({
    walletConnectProjectId,
    supportedNetworks,
    metadata,
    enableEIP6963 = true,
    enableInjected = true,
    enableCoinbase = false, 
    enableAnalytics = false
}: Web3ModalOptions) => {

    if(supportedNetworks.length === 0) throw new Error("You must provide at least one supported network.");

    const ethersConfig = defaultConfig({
        metadata,
        enableEIP6963,
        enableInjected,
        enableCoinbase,
    });

    createWeb3Modal({
        ethersConfig,
        chains: supportedNetworks,
        projectId: walletConnectProjectId,
        enableAnalytics,
    })

};

/**
 * Initialize Web3Modal from a config object
 */
interface InitWeb3ModalFromConfigProps{
    walletConnectProjectId: string,
    config: ProviderType,
    supportedNetworks: Chain[],
    enableAnalytics?: boolean
}
export const initWeb3ModalFromConfig = ({
    config,
    supportedNetworks,
    walletConnectProjectId,
    enableAnalytics = false
}: InitWeb3ModalFromConfigProps) => {
    createWeb3Modal({
        ethersConfig: config,
        chains: supportedNetworks,
        projectId: walletConnectProjectId,
        enableAnalytics,
    })
}