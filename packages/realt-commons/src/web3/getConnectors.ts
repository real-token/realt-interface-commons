import { AvailableConnectors, C, ConnectorMap, ConnectorsMap, LibraryConnectors } from './type';

export type ConnectorsAvailable = {
    [key in AvailableConnectors]: C;
};

export type GetConnectors = (
    availableConnectors: ConnectorsAvailable
) => LibraryConnectors;

export const getConnectors: GetConnectors = (availableConnectors) => {

    if(Object.keys(availableConnectors).length == 0){
        throw new Error('Cannot use library whitout providing minimum one connector.')
    }

    const connectors: C[] = [];
    const connectorsMap: ConnectorsMap = new Map<AvailableConnectors, ConnectorMap>();
    Object.keys(availableConnectors).forEach((availableConnectorsMapKey) => {

        const availableConnector = AvailableConnectors[availableConnectorsMapKey as keyof typeof AvailableConnectors];
        const connector = availableConnectors[availableConnector];

        const connectorMap: ConnectorMap = {
            connector: connector[0],
            hooks: connector[1]
        }

        connectors.push(connector);
        connectorsMap.set(availableConnector, connectorMap);
    });

    return {
        connectors,
        connectorsMap
    }

}