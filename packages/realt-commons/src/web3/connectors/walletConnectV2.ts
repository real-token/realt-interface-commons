import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { URLS } from '../../config/constants/chain';

export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "f91eb59b4e4c2c357e8d35c0361c3780",
        chains: Object.keys(URLS).map(Number),
        showQrModal: true
      },
    })
)