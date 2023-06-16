import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { ReactNode } from 'react';

export type Web3ProvidersProps = {
    children: ReactNode;
};

export type C = [Connector,Web3ReactHooks];
export type ConnectorMap = {
    connector: Connector,
    hooks: Web3ReactHooks
}
export type ConnectorsMap = {
    metamask: ConnectorMap|undefined,
    gnosisSafe: ConnectorMap|undefined,
    walletConnect: ConnectorMap|undefined,
    [key: string]: ConnectorMap|undefined
};

export type LibraryConnectors = {
    connectors: C[],
    connectorsMap: ConnectorsMap
}