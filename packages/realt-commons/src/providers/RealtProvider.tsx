import { useEffect } from 'react';
import { create } from 'zustand';
import { ConnectorsMap } from '../web3';
import { environment } from '../config/constants/env';

type RealtProviderSetableProps = {
    env?: string;
    showAllNetworks?: boolean;
    enableRealtAAConnector?: boolean;
}

type RealtProviderFixedProps = {
    setShowAllNetworks: (state: boolean) => void,
    storeLoaded: boolean,
    setStoreLoaded: (state: boolean) => void,
    connectors: ConnectorsMap|undefined;
    setConnectors: (connectors: ConnectorsMap) => void;
    setValue: (value: RealtProviderSetableProps) => void;
};

type RealtProviderStoreProps = RealtProviderSetableProps & RealtProviderFixedProps;

export const useRootStore = create<RealtProviderStoreProps>()((set) => ({
    showAllNetworks: false,
    setShowAllNetworks: (showAllNetworks: boolean) => set({ showAllNetworks }),
    storeLoaded: false,
    setStoreLoaded: (storeLoaded: boolean) => set({ storeLoaded }),
    env: environment.PRODUCTION,
    connectors: undefined,
    setConnectors: (connectors: ConnectorsMap) => set({ connectors }),
    setValue: (value: RealtProviderSetableProps) => set(value)
}));

interface RealtProviderProps{
    children: React.ReactNode;
    value: RealtProviderSetableProps
}
const RealtProvider = ({ children, value }: RealtProviderProps) => {

    const [setValue,setStoreLoaded] = useRootStore((state) => [state.setValue, state.setStoreLoaded]);

    useEffect(() => {
        setValue(value);
        setStoreLoaded(true)
    },[value])

    return <>{children}</>
}
export default RealtProvider;