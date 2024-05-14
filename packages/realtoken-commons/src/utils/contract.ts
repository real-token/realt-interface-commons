import { isAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import ethers from 'ethers';

export const getContract = <T extends Contract>(
  addressOrName: string,
  contractInterface: ContractInterface,
  walletProvider: ethers.providers.ExternalProvider,
  account?: string
): T | undefined => {
  if (!isAddress(addressOrName) || addressOrName === AddressZero) {
    return undefined;
  }

  const provider = new ethers.providers.Web3Provider(walletProvider) 

  return new Contract(
    addressOrName,
    contractInterface,
    account ? provider.getSigner(account).connectUnchecked() : provider
  ) as T;
};
