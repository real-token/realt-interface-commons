import { FC} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChainList, ChainSelectedIcon } from '../chainSelect/ChainSelect';
import { Chain, ChainSelectConfig } from '../../types';

export function NetworkMenuItems(){
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  return (
    <>
      <Menu.Label pb={0}>{t('network')}</Menu.Label>
      <ChainList/>
    </>
  );
};

export function NetworkMenu(){
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
          <ChainSelectedIcon />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <NetworkMenuItems />
      </Menu.Dropdown>
    </Menu>
  );
};