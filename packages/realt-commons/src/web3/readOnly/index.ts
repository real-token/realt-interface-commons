import { Actions, Connector, Provider, WatchAssetParameters } from "@web3-react/types";
import { Chain, ChainSelectConfig } from "../../types";

export class NoReadOnlyError extends Error {
  public constructor() {
    super('ReadOnly provider not working')
    this.name = NoReadOnlyError.name
    Object.setPrototypeOf(this, NoReadOnlyError.prototype)
  }
}

function parseChainId(chainId: string) {
  return Number.parseInt(chainId, 16)
}

function getChainInfos<T>(customChains: ChainSelectConfig<T>, chainId: number|undefined){
  const defaultChain = customChains.defaultChainId;
  const chainConfig = 
      chainId ? 
        customChains.chainsConfig[chainId]
      : defaultChain ? 
        customChains.chainsConfig[defaultChain]
      :
      Object.values(customChains.chainsConfig)[0];
  
  return chainConfig;
}

export interface ReadOnlyConstructorArgsOptions<T extends Partial<Chain>>{
  customChains: ChainSelectConfig<T>
}

export interface ReadOnlyConstructorArgs<T extends Partial<Chain>>{
  actions: Actions;
  options: ReadOnlyConstructorArgsOptions<T>;
  onError?: (error: Error) => void;
}

export type ReadOnlyProvider = Provider & {
  isConnected?: () => boolean
};

export class ReadOnly<T extends Partial<Chain>> extends Connector{

  declare public provider?: ReadOnlyProvider | undefined;

  private readonly options: ReadOnlyConstructorArgsOptions<T>;
  private eagerConnection?: Promise<void>

  constructor({ actions, onError, options }: ReadOnlyConstructorArgs<T>){
    super(actions, onError);
    this.options = options;
  }

  private readOnlyAddress(): string{
    const storedReadAddress = localStorage.getItem('readOnlyAddress');
    if(!storedReadAddress) throw new Error('Cannot use ReadOnly connector without address.')

    return storedReadAddress;
  }

  private async isomorphicInitialize(desiredChainId?: number): Promise<void> {
    if (this.eagerConnection && !desiredChainId) return;

    return (this.eagerConnection = import('eth-provider').then(async (m) => {
      const chainConfig = getChainInfos<T>(this.options.customChains, desiredChainId ?? undefined);
      this.provider = await m.default(chainConfig.rpcUrl) as Provider;
    }));

  }

  /** {@inheritdoc Connector.connectEagerly} */
  public async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation()

    try {
      await this.isomorphicInitialize()
      if (!this.provider) return cancelActivation()

      const accounts = [this.readOnlyAddress()] as string[]
      if (!accounts.length) throw new Error('No accounts returned')

      const chainId = (await this.provider.request({ method: 'eth_chainId' })) as string
      this.actions.update({ chainId: parseChainId(chainId), accounts });
      
    } catch (error) {
      console.debug('Could not connect eagerly', error)
      this.actions.resetState()
    }
  }

  public async activate(desiredChainId?: number): Promise<void> {
    let cancelActivation: () => void
    if (!this.provider?.isConnected?.()) cancelActivation = this.actions.startActivation()

    return this.isomorphicInitialize(desiredChainId)
      .then(async () => {
        if (!this.provider) throw new NoReadOnlyError()

        // Wallets may resolve eth_chainId and hang on eth_accounts pending user interaction, which may include changing
        // chains; they should be requested serially, with accounts first, so that the chainId can settle.
        const accounts = [this.readOnlyAddress()] as string[];
        const chainId = (await this.provider.request({ method: 'eth_chainId' })) as string;

        return this.actions.update({ chainId: parseChainId(chainId), accounts })
        
      })
      .catch((error) => {
        cancelActivation?.()
        throw error
      })
  }

  public async deactivate(): Promise<void>{
    localStorage.removeItem('readOnlyAddress');
    this.actions.resetState();

    return;
  }


  public async watchAsset({}: WatchAssetParameters): Promise<true> {
    if (!this.provider) throw new Error('No provider')
    throw Error('Cannot watch asset with ReadOnly connector.')
  }
 

}