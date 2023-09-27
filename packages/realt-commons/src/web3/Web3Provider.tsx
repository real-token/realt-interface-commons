import { FC, ReactNode, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { useAtomValue } from 'jotai';
import { providerAtom } from '../states';
import { useRootStore } from '../providers/RealtProvider';
import { generateString } from '../utils/string';
import { ConnectorsMap, LibraryConnectors } from './type';

export const metamaskKey = "metamask";
export const gnosisSafeKey = "gnosisSafe";
export const walletConnectV2Key = "walletConnect";
export const networkKey = "network";
export const frameKey = "frame";

const tryEagerlyConnect = (connectors: ConnectorsMap, lastUsedProvider: string) => {
  try{

    const connector = connectors[lastUsedProvider]?.connector;
    if(!connector) return;

    if(connector.connectEagerly) connector.connectEagerly();

  }catch(err){
    console.log(err);
  }
}

interface ConnectEagerlyProps{
  connectors: ConnectorsMap
};
const ConnectEagerly: FC<ConnectEagerlyProps> = ({ connectors }) => {

  const lastUsedProvider = useAtomValue(providerAtom);

  useEffect(() => {
    if(!lastUsedProvider ) return;
    tryEagerlyConnect(connectors, lastUsedProvider);
  }, [lastUsedProvider])

  return null;
};

type Web3ProvidersProps = {
  children: ReactNode;
  libraryConnectors: LibraryConnectors
};

export function Web3Providers({ children, libraryConnectors } : Web3ProvidersProps){

  const { connectors, connectorsMap } = libraryConnectors;

  const [setConnectors] = useRootStore(
    (state) => [state.setConnectors]
  );

  useEffect(() => {
    setConnectors(connectorsMap);
  },[connectorsMap])

  return(
    <Web3ReactProvider connectors={connectors}>
      <ConnectEagerly connectors={connectorsMap}/>
      {children}
    </Web3ReactProvider>
  );
};
