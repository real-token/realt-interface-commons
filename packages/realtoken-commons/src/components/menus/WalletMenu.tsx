import { FC, forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps, Flex, FlexProps, Menu, Text, Image, Box } from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconExternalLink,
  IconLogout,
} from '@tabler/icons';

import { useActiveChain } from '../../hooks/blockchain/useActiveChain';
import { FRC } from '../../types/FRC';
import { shortenString } from '../../utils/shortenString';
import { NOTIFICATIONS, NotificationsID } from '../../config/constants/notifications';
import { Link } from '../link';
import { useDisconnect, useWeb3ModalAccount, useWalletInfo, useWeb3Modal } from '@web3modal/ethers5/react'
import React from 'react';
import { useRealtokenStore } from '../../providers/store';

const WalletUser: FRC<ButtonProps, HTMLButtonElement> = forwardRef(
  (props, ref) => {
    const { address } = useWeb3ModalAccount();

    return (
      <Button {...props} ref={ref} aria-label={shortenString(address)}>
        {shortenString(address)}
      </Button>
    );
  }
);
WalletUser.displayName = 'WalletUser';

const CopyToClipboardMenuItem: FC = () => {
  const { address } = useWeb3ModalAccount();

  const { copy } = useClipboard({ timeout: 500 });

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  const onCopy = useCallback(() => {
    copy(address);
    showNotification(NOTIFICATIONS[NotificationsID.userCopied]);
  }, [address, copy]);

  return (
    <Menu.Item leftSection={<IconCopy size={18} />} onClick={onCopy}>
      {t('copy')}
    </Menu.Item>
  );
};

function ViewOnExplorerMenuItem(){
  const { address } = useWeb3ModalAccount();

  const c = useRealtokenStore((s) => s.chainConfig)
  const activeChain = useActiveChain(c);

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  if(!activeChain) return(<></>);

  return (
    <Menu.Item
      leftSection={<IconExternalLink size={18} />}
      component={Link}
      href={`${activeChain?.blockExplorerUrl}address/${address}`}
      target={'_blank'}
    >
      {t('viewOn')}
    </Menu.Item>
  );
};

const DisconnectMenuItem: FC = () => {
  const { disconnect } = useDisconnect();

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  return (
    <Menu.Item leftSection={<IconLogout size={18} />} onClick={() => disconnect()}>
      {t('disconnect')}
    </Menu.Item>
  );
};

const ConnectWalletInfos = React.forwardRef((props: FlexProps) => {
  
  const { walletInfo } = useWalletInfo();
  const { open } = useWeb3Modal()

  return(
    <Box 
      style={(theme) => ({ padding: theme.spacing.sm })}
      onClick={() => open()}
    >
      <Flex 
        {...props}
        style={{  backgroundColor: 'black' }}
        gap={'sm'}
      >
        <Image src={walletInfo?.icon} alt={walletInfo?.name} fit={'contain'} h={30} />
        <Text c={'white'}>{walletInfo?.name}</Text>
      </Flex> 
    </Box>
)
});

export function WalletMenu(){
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <WalletUser
          rightSection={
            isOpen ? (
              <IconChevronUp size={16} stroke={3} />
            ) : (
              <IconChevronDown size={16} stroke={3} />
            )
          }
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={ConnectWalletInfos} />
        <CopyToClipboardMenuItem />
        <ViewOnExplorerMenuItem />
        <DisconnectMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};