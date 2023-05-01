import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChainsID, CHAINS } from '../../config/constants/chain';
import { Chain, ChainSelectConfig } from '../../types';


export function useActiveChain<T extends Partial<Chain>>(chainConfig: ChainSelectConfig<T>): T|undefined {
  const { chainId } = useWeb3React();

  return useMemo(() => chainId && chainId in ChainsID ? chainConfig.chainsConfig[chainId as ChainsID] : undefined,[chainId]);
};
