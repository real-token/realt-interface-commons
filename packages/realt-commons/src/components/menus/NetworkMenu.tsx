import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChainList, ChainSelectedIcon } from '../chainSelect/chainSelect';
import { Chain, ChainSelectConfig } from '../../types';

interface NetworkMenuItemsProps<T>{
  chains?: ChainSelectConfig<T>
}

export function NetworkMenuItems<T extends Partial<Chain>>({ chains }:NetworkMenuItemsProps<T>){
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  return (
    <>
      <Menu.Label pb={0}>{t('network')}</Menu.Label>
      <ChainList chains={chains}></ChainList>
    </>
  );
};

interface NetworkMenuProps<T>{
  chains?: ChainSelectConfig<T>
}
export function NetworkMenu<T extends Partial<Chain>>({ chains }:NetworkMenuProps<T>){
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={true}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <ActionIcon size={36} variant={'outline'} color={'brand'}>
          <ChainSelectedIcon chains={chains} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <NetworkMenuItems chains={chains}/>
      </Menu.Dropdown>
    </Menu>
  );
};