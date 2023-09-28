import { C, ConnectorsMap } from './type';

export interface ConnectorsAvailable{
    metaMask?: C,
    gnosisSafe?: C,
    walletConnectV2?: C,
    readOnly?: C
}
export const getConnectors = (availableConnectors: ConnectorsAvailable) => {

    const { metaMask, gnosisSafe, walletConnectV2, readOnly } = availableConnectors;

    if(Object.keys(availableConnectors).length == 0){
        throw new Error('Cannot use library whitout providing minimum one connector.')
    }

    const connectors: C[] = [];
    Object.values(availableConnectors).forEach((connector) => {
        connectors.push(connector);
    })
    // if(metaMask) connectors.push(metaMask);
    // if(gnosisSafe) connectors.push(gnosisSafe);
    // if(walletConnectV2) connectors.push(walletConnectV2);

    const connectorsMap: ConnectorsMap = {
        metamask: metaMask ? {
            connector: metaMask[0],
            hooks: metaMask[1]
        }: undefined,
        gnosisSafe: gnosisSafe ? {
            connector: gnosisSafe[0],
            hooks: gnosisSafe[1]
        }: undefined,
        walletConnect: walletConnectV2 ? {
            connector: walletConnectV2[0],
            hooks: walletConnectV2[1]
        }: undefined,
        readOnly: readOnly ? {
            connector: readOnly[0],
            hooks: readOnly[1]
        }: undefined
    }

    return {
        connectors,
        connectorsMap
    }

}