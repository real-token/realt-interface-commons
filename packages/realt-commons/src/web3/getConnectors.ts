import { C, ConnectorsMap } from './type';

export const getConnectors = (
    metaMask?: C,
    gnosisSafe?: C,
    walletConnectV2?: C,
    frame?: C
) => {
    if(!metaMask && !gnosisSafe && !walletConnectV2){
        throw new Error('Cannot use library whiteout providing minimum one connector.')
    }

    const connectors: C[] = [];
    if(metaMask) connectors.push(metaMask);
    if(gnosisSafe) connectors.push(gnosisSafe);
    if(walletConnectV2) connectors.push(walletConnectV2);
    if(frame) connectors.push(frame)

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
        frame: frame ? {
            connector: frame[0],
            hooks: frame[1]
        }: undefined
    }

    return {
        connectors,
        connectorsMap
    }

}