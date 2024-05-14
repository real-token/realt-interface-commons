import { useMemo } from 'react';
import { Contract } from '@ethersproject/contracts';
import { getContract } from '../../utils';
import { ContractsID } from '../../config';
import { useActiveChain } from './useActiveChain';
import { useRealtokenStore } from '../../providers/store';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'

export const useContract = <T extends Contract>(contractId: ContractsID) => {
  const { address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider()

  const customChains = useRealtokenStore((s) => s.chainConfig);

  const activeChain = useActiveChain(customChains);

  return useMemo(() => {
    if (!activeChain || !activeChain.contracts ||  !walletProvider) return undefined;

    const { abi, address } = activeChain.contracts[contractId];

    const contract = getContract(address, abi, walletProvider, address);

    if (!contract) return undefined;

    return contract as T;
  }, [address, activeChain, contractId, walletProvider]);
};
