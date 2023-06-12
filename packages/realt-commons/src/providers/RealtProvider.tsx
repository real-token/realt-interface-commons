import { createContext } from 'react';

export interface RealtProviderProps{
    env: string;
}

export const RealtProvider = createContext<RealtProviderProps>({
    env: "production"
});
export default RealtProvider;