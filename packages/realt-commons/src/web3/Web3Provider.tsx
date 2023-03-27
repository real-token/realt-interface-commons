import { Web3ReactProvider } from '@web3-react/core';
import { FC, useEffect } from 'react';
import React from "react";
import { connectors, metaMask, network } from './connectors';
import { Web3ProvidersProps } from './type';

const ConnectEagerly: FC = () => {
  useEffect(() => {
    void network.activate();
  }, []);

  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

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
