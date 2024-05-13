import { initializeConnector } from '@web3-react/core';
import { GnosisSafe } from '../gnosisafe/gnosis';

export const [gnosisSafe, hooks] = initializeConnector<GnosisSafe>(
  (actions) =>
    new GnosisSafe({
      actions: actions,
    //   options: { allowedDomains: [] },
    })
);