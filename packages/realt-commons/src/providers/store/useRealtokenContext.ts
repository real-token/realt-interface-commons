import { useContext } from 'react'
import { useStore } from 'zustand'
import { getRealtokenProviderContext, RealtokenStoreProps } from './RealtokenProvider'
import { Chain } from '../../types'

type Selector<T extends Partial<Chain>,U> = (state: RealtokenStoreProps<T>) => U

export function useRealtokenStore<U,T extends Partial<Chain>>(selector: Selector<T,U>): U {
  const store = useContext(getRealtokenProviderContext<T>())
  if (!store) throw new Error('Missing RealtokenProviderContext.Provider in the tree')
  return useStore(store, selector)
}
