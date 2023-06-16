import { Web3ReactHooks, initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { Connector } from '@web3-react/types';
import { Chain, ChainSelectConfig } from '../../types';

export function getWalletConnectV2<T extends Partial<Chain>>(customChains: ChainSelectConfig<T>, env: string, walletConnectV2ApiKey: string): [Connector, Web3ReactHooks]{

  const isTestnet = env !== "production";
  const allowedChains = customChains.allowedChains.filter(
    (chain) => isTestnet ? customChains.chainsConfig[chain].isTestnet : !customChains.chainsConfig[chain].isTestnet
  );

  const [walletConnectV2, hooks] =  initializeConnector<WalletConnectV2>(
    (actions) => new WalletConnectV2({
        actions,
        options: {
          projectId: walletConnectV2ApiKey,
          chains: allowedChains,
          showQrModal: true
        },
      })
  );
  return [walletConnectV2, hooks];
} 