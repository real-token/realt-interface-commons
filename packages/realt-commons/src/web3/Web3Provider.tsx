import { FC, ReactNode, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { connectors, metaMask, network, walletConnect, gnosisSafe } from '../web3/connectors';
import { useAtomValue } from 'jotai';
import { providerAtom } from '../states';

type Web3ProvidersProps = {
  children: ReactNode;
};

const ConnectEagerly: FC = () => {

  const lastUsedProvider = useAtomValue(providerAtom);

  useEffect(() => {
    void network.activate();
  }, []);

  useEffect(() => {
    if(!lastUsedProvider) return;

    if(lastUsedProvider !== ""){
      switch(lastUsedProvider){
        case "metamask":
          metaMask.connectEagerly();
          break;
        case "wallet-connect":
          walletConnect.connectEagerly();
          break;
        case "gnosis-safe":
          gnosisSafe.connectEagerly();
          break;
      }
    }
  }, [lastUsedProvider])

  return null;
};

export const Web3Providers: FC<Web3ProvidersProps> = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <ConnectEagerly />
      {children}
    </Web3ReactProvider>
  );
};
