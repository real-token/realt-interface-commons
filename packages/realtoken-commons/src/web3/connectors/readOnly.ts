import { Web3ReactHooks, initializeConnector } from "@web3-react/core";
import { Chain, ChainSelectConfig } from "../../types";
import { ReadOnly } from "../readOnly";
import { Connector } from "@web3-react/types";

export function getReadOnlyConnector<T extends Partial<Chain>>(customChains: ChainSelectConfig<T>): [Connector, Web3ReactHooks]{

    const [readOnly, hooks] = initializeConnector<ReadOnly<T>>(
        (actions) => new ReadOnly<T>({
            actions,
            options: {
                customChains,
            },
        })
    );
    return [readOnly, hooks];
      
}