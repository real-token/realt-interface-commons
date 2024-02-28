import { Web3ReactHooks, initializeConnector } from '@web3-react/core'
import { RealtAA, AAClientConfig } from '@real-token/web3-react-aa'
import { Connector } from '@web3-react/types';

export function getRealtAAConnector(
  config: AAClientConfig,
): [Connector, Web3ReactHooks]{

  const [realtAA, hooks] = initializeConnector<RealtAA>((actions) => new RealtAA({ actions, config }))

  return [realtAA, hooks]
}