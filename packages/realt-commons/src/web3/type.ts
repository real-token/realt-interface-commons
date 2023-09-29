import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { ReactNode } from 'react';
import { GnosisSafe, MetaMask, WalletConnect } from '../assets';
import { t } from 'i18next';
import { MantineGradient } from '@mantine/core';

export enum AvailableConnectors{
    metamask = 'metamask',
    gnosisSafe = 'gnosisSafe',
    walletConnectV2 = 'walletConnectV2',
    readOnly = 'readOnly'
}

export interface ConnectorData{
    connectorEnum: AvailableConnectors;
    connectorKey: string;
    title?: string;
    src?: string;
    gradient?: MantineGradient,
    color: string;
}

export const ConnectorsDatas = new Map<AvailableConnectors,ConnectorData>([
    [AvailableConnectors.metamask, {
        connectorEnum: AvailableConnectors.metamask,
        connectorKey: "metamask",
        title: "Metamask",
        src: MetaMask,
        gradient: { from: '#CD6116', to: '#F6851B' },
        color: '#F6851B'
    }],
    [AvailableConnectors.gnosisSafe, {
        connectorEnum: AvailableConnectors.gnosisSafe,
        connectorKey: "gnosisSafe",
        title: "GnosisSafe",
        src: GnosisSafe,
        gradient: { from: '#005233', to: '#00bb55' },
        color: '#00bb55'
    }],
    [AvailableConnectors.walletConnectV2, {
        connectorEnum: AvailableConnectors.walletConnectV2,
        connectorKey: "walletConnect",
        title: 'WalletConnect V2',
        src: WalletConnect,
        gradient: { from: '#006FFF', to: '#5C9DF5' },
        color: '#5C9DF5'
    }],
    [AvailableConnectors.readOnly, {
        connectorEnum: AvailableConnectors.readOnly,
        connectorKey: "readOnly",
        color: '#000'
    }]
])

export type Web3ProvidersProps = {
    children: ReactNode;
};

export type C = [Connector,Web3ReactHooks];
export type ConnectorMap = {
    connector: Connector,
    hooks: Web3ReactHooks
}
export type ConnectorsMap = Map<AvailableConnectors, ConnectorMap | undefined>;

export type LibraryConnectors = {
    connectors: C[],
    connectorsMap: ConnectorsMap
}