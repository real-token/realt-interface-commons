import { FC, forwardRef, useCallback } from 'react';

import {
  Flex,
  Group,
  Select,
  SelectItem,
  SelectProps,
  Text,
} from '@mantine/core';
import { useWeb3React } from '@web3-react/core';

import { FRC } from '../../types/FRC';
import { useActiveChain } from '../../hooks/blockchain/useActiveChain';
import { ALLOWED_CHAINS, CHAINS, ChainsID } from '../../config/constants/chain';
import { IconAlertCircle } from '@tabler/icons';
import { Chain, ChainSelectConfig } from '../../types';

type ChainSelectItemsProps = {
  label: string;
  logo: FC<any>;
};

const ChainSelectItems: FRC<ChainSelectItemsProps, HTMLDivElement> = forwardRef(
  ({ label, logo, ...props }, ref) => {
    const Logo = logo;
    return (
      <Group {...props} ref={ref} spacing={'xs'}>
        { Logo ? <Logo width={18}/> : <></> }
        <Text>{label}</Text>
      </Group>
    );
  }
);
ChainSelectItems.displayName = 'ChainSelectItems';

interface ChainSelectedIconProps<T>{
  chains: ChainSelectConfig<T>|undefined
}
function ChainSelectedIcon<T extends Partial<Chain>>({ chains }: ChainSelectedIconProps<T>){

  const c = chains ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS} as ChainSelectConfig<T>;
  const activeChain = useActiveChain<T>(c);

  const Logo = activeChain?.logo;

  return Logo ? <Logo width={18}/> : <></>;
  
};

type ChainSelectProps<T> = {
  chains?: ChainSelectConfig<T> | undefined
} & Partial<SelectProps>;

export function ChainSelect<T extends Partial<Chain>>({ chains, ...props }: ChainSelectProps<T>){
  const { chainId, connector } = useWeb3React();

  const c = chains ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS};

  const data = c.allowedChains
    .filter((chain) => (chain.toString() !== "5" && process.env.NODE_ENV === "production") || process.env.NODE_ENV !== "production")
    .map<SelectItem>((chain) => ( {
      value: chain.toString(),
      label: c.chainsConfig[chain as ChainsID].chainName,
      logo: c.chainsConfig[chain as ChainsID].logo,
    }));

  const switchChain = useCallback(
    async (chainValue: string) => {
      const desiredChainId = Number(chainValue);
      if (desiredChainId === chainId) return;

      await connector.activate(desiredChainId);
    },
    [chainId, connector]
  );

  if(!data.find( (item: SelectItem) => item.value == chainId?.toString())){
    return(
      <Flex
        sx={(theme) => ({ 
          borderWidth: '2px', 
          borderStyle: "solid", 
          borderColor: theme.colors.red,
          marginLeft: 6,
          marginRight: 6,
          padding: 5,
          borderRadius: 7
        })}
        gap={4}
        justify={"center"}
        pb={"md"}
      >
        <IconAlertCircle/>
        <Text weight={600}>{'Unsupported network'}</Text>
      </Flex>
    )
  }

  return (
    <Select
      {...props}
      data={data}
      icon={<ChainSelectedIcon chains={chains}/>}
      disabled={!chainId}
      value={chainId?.toString()}
      onChange={switchChain}
      itemComponent={ChainSelectItems}
    />
  );
};
