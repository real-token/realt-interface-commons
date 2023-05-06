import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useActiveChain } from '@realtoken/realt-commons';
import { getContract } from '../../utils';
import { Chain, ChainSelectConfig } from '../../types';
import { ContractsID } from '../../config';

export const useContract = <T extends Contract, M extends Partial<Chain>>(customChains: ChainSelectConfig<M>, contractId: ContractsID) => {
  const { account, provider, chainId } = useWeb3React();

//   const chainConfig = customChains;
//   const activeChain = chainConfig.chainsConfig[chainId as ChainsID]

  const activeChain = useActiveChain(customChains);

  return useMemo(() => {
    if (!activeChain || !activeChain.contracts ||  !provider) return undefined;

    const { abi, address } = activeChain.contracts[contractId];

    const contract = getContract(address, abi, provider, account);

    if (!contract) return undefined;

    return contract as T;
  }, [account, activeChain, contractId, provider]);
};
