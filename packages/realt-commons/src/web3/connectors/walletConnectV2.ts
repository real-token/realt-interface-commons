import { Web3ReactHooks, initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { Connector } from '@web3-react/types';
import { Chain, ChainSelectConfig } from '../../types';
import { environment } from '../../config/constants/env';

export function getWalletConnectV2<T extends Partial<Chain>>(customChains: ChainSelectConfig<T>, env: string, walletConnectV2ApiKey: string, showAllNetworks: boolean = false): [Connector, Web3ReactHooks]{

  const isTestnet = env !== environment.PRODUCTION;
  const allowedChains = customChains.allowedChains.filter(
    (chain) => showAllNetworks ? true : isTestnet ? customChains.chainsConfig[chain].isTestnet : !customChains.chainsConfig[chain].isTestnet
  );
  // metamask fix https://github.com/orgs/WalletConnect/discussions/2920#discussioncomment-6335583
  const [walletConnectV2, hooks] =  initializeConnector<WalletConnectV2>(
    (actions) => new WalletConnectV2({
        actions,
        options: {
          projectId: walletConnectV2ApiKey,
          chains: allowedChains.slice(0, 1),
          optionalChains: allowedChains.slice(1),
          showQrModal: true
        },
      })
  );
  return [walletConnectV2, hooks];
} 