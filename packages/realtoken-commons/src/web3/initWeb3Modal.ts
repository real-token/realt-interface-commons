import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
import type { Metadata, ProviderType, Chain } from '@web3modal/scaffold-utils/ethers';
import { CHAINS, ChainsID } from '../config';
import { parseChainConfigToWeb3Modal } from './parseChainConfig';

const defaultFeaturedWalletIds: string[] = [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // Metamask,
    "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1", // Rabby
    "a9751f17a3292f2d1493927f0555603d69e9a3fcbcdf5626f01b49afa21ced91", // Frame
    "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f", // Safe
    "e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b", // WalletConnect
    "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927", // Ledger live
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trustwallet
    "7424d97904535b14fe34f09f63d8ca66935546f798758dabd5b26c2309f2b1f9", // Bridge wallet
    "ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18", // Zerion
];

interface Web3ModalOptions {
    walletConnectProjectId: string,
    supportedNetworks: any,
    metadata: Metadata,
    defaultChainId?: number,
    enableEIP6963?: boolean,
    enableInjected?: boolean,
    enableCoinbase?: boolean,
    enableAnalytics?: boolean,
    featuredWalletIds?: string[]
}
export const initWeb3Modal = ({
    walletConnectProjectId,
    supportedNetworks,
    metadata,
    defaultChainId = ChainsID.Gnosis,
    enableEIP6963 = true,
    enableInjected = true,
    enableCoinbase = false, 
    enableAnalytics = false,
    featuredWalletIds = undefined
}: Web3ModalOptions) => {

    if(supportedNetworks.length === 0) throw new Error("You must provide at least one supported network.");
    if(featuredWalletIds && featuredWalletIds.length === 0) throw new Error("You must provide at least one featured wallet.");

    const ethersConfig = defaultConfig({
        metadata,
        enableEIP6963,
        enableInjected,
        enableCoinbase,
    });

    const defaultChain = parseChainConfigToWeb3Modal(CHAINS[defaultChainId]);

    createWeb3Modal({
        ethersConfig,
        chains: supportedNetworks,
        projectId: walletConnectProjectId,
        enableAnalytics,
        featuredWalletIds: featuredWalletIds ?? defaultFeaturedWalletIds,
        defaultChain,
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