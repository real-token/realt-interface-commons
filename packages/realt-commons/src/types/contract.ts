import { JsonFragment } from '@ethersproject/abi';
import { ContractsID } from '../config/constants/contract';

export type Contracts = {
  [contract in ContractsID]: {
    abi: ReadonlyArray<JsonFragment>;
    address: string;
  };
};
