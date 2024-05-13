import { createStore } from 'zustand';
import { ConnectorsMap } from '../../web3';
import { environment } from '../../config/constants/env';
import { createContext, PropsWithChildren, useRef } from 'react'
import { Chain, ChainSelectConfig, parseAllowedChain } from '../../types';
import { CHAINS, ChainsID } from '../../config';

export type RealtokenProviderSetableProps<T extends Partial<Chain>> = {
    showAllNetworks?: boolean;
    chainConfig: ChainSelectConfig<T>;
    env?: string;
}

type RealtokenProviderFixedProps = {
    setShowAllNetworks: (state: boolean) => void,
    storeLoaded: boolean,
    setStoreLoaded: (state: boolean) => void,
    connectors: ConnectorsMap|undefined;
    setConnectors: (connectors: ConnectorsMap) => void;
};

export type RealtokenStoreProps<T extends Partial<Chain>> = RealtokenProviderSetableProps<T> & RealtokenProviderFixedProps;

export type RealtokenStore<T extends Partial<Chain>> = ReturnType<typeof createRealtStore<T>>;

function createRealtStore<T extends Partial<Chain>>(initProps?: Partial<RealtokenProviderSetableProps<T>>){
    const DEFAULT_PROPS: RealtokenProviderSetableProps<T> = {
        env: environment.PRODUCTION,
        showAllNetworks: false,
        chainConfig: {
            allowedChains: parseAllowedChain(ChainsID),
            chainsConfig: CHAINS,
            defaultChainId: ChainsID.Gnosis
        } as ChainSelectConfig<T>
    }

    return createStore<RealtokenStoreProps<T>>((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        showAllNetworks: false,
        setShowAllNetworks: (showAllNetworks: boolean) => set({ showAllNetworks }),
        storeLoaded: false,
        setStoreLoaded: (storeLoaded: boolean) => set({ storeLoaded }),
        env: environment.PRODUCTION,
        connectors: undefined,
        setConnectors: (connectors: ConnectorsMap) => set({ connectors }),
    }));
}

export function getRealtokenProviderContext<T extends Partial<Chain>>(){
    return createContext<RealtokenStore<T> | null>(null)
}

interface RealtokenProviderProps<T extends Partial<Chain>> extends PropsWithChildren{
    value: RealtokenProviderSetableProps<T>
}
export function RealtokenProvider<T extends Partial<Chain>>({ children, value }: RealtokenProviderProps<T>){

    const storeRef = useRef<RealtokenStore<T>>()
    if (!storeRef.current) {
        storeRef.current = createRealtStore<T>(value)
    }

    const RealtokenProviderContext = getRealtokenProviderContext<T>();

    return(
        <RealtokenProviderContext.Provider value={storeRef.current}>
            {children}
        </RealtokenProviderContext.Provider>
    )
}