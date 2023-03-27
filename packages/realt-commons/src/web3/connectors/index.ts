import { Web3ReactHooks } from '@web3-react/core';
import { Connector } from '@web3-react/types';
import { metaMask, hooks as metaMaskHooks } from './metaMask';
import { network, hooks as networkHooks } from './network';
import { gnosisSafe, hooks as gnosisHooks } from './gnosisSafe';
import { walletConnect, hooks as walletConnectHooks } from './walletConnect';

const connectors: [Connector,Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [gnosisSafe,gnosisHooks],
  [network, networkHooks],
];

export {
  connectors,
  metaMask,
  metaMaskHooks,
  walletConnect,
  walletConnectHooks,
  gnosisSafe,
  gnosisHooks,
  network,
  networkHooks,
};
