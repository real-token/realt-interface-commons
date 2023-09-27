import { initializeConnector } from '@web3-react/core';
import { Frame } from '../frame/frame';

export const [frame, hooks] = initializeConnector<Frame>((actions) => new Frame({ actions }));