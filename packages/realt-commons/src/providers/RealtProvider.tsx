import { useEffect } from 'react';
import { create } from 'zustand';
import { ConnectorsMap } from '../web3';

type RealtProviderMandatory = {
    env: string;
};

type RealtProviderOptional = {
    storeLoaded: boolean,
    setStoreLoaded: (state: boolean) => void,
    connectors: ConnectorsMap|undefined;
    setConnectors: (connectors: ConnectorsMap) => void;
    setMandatory: (value: RealtProviderMandatory) => void;
};

type RealtProviderStoreProps = RealtProviderMandatory & RealtProviderOptional;

export const useRootStore = create<RealtProviderStoreProps>()((set) => ({
    storeLoaded: false,
    setStoreLoaded: (storeLoaded: boolean) => set({ storeLoaded }),
    env: "production",
    connectors: undefined,
    setConnectors: (connectors: ConnectorsMap) => set({ connectors }),
    setMandatory: (value: RealtProviderMandatory) => set(value)
}));

interface RealtProviderProps{
    children: React.ReactNode;
    value: RealtProviderMandatory
}
const RealtProvider = ({ children, value }: RealtProviderProps) => {

    const [setMandatory,setStoreLoaded] = useRootStore((state) => [state.setMandatory, state.setStoreLoaded]);

    useEffect(() => {
        setMandatory(value);
        setStoreLoaded(true)
    },[value])

    return <>{children}</>
}
export default RealtProvider;