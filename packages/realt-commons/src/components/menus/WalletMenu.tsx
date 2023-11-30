import { FC, forwardRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps, Flex, FlexProps, Menu, Text, Image, Box, BoxProps } from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconExternalLink,
  IconLogout,
} from '@tabler/icons';
import { useWeb3React } from '@web3-react/core';

import { useActiveChain } from '../../hooks/blockchain/useActiveChain';
import { FRC } from '../../types/FRC';
import { shortenString } from '../../utils/shortenString';
import { NOTIFICATIONS, NotificationsID } from '../../config/constants/notifications';
import { Link } from '../link';
import { Chain, ChainSelectConfig } from '../../types';
import { ALLOWED_CHAINS, CHAINS } from '../../config';
import { useAtomValue, useSetAtom } from 'jotai';
import { providerAtom } from '../../states';
import { AvailableConnectors, ConnectorData, ConnectorsDatas } from '../../web3';

const WalletUser: FRC<ButtonProps, HTMLButtonElement> = forwardRef(
  (props, ref) => {
    const { account } = useWeb3React();

    return (
      <Button {...props} ref={ref} aria-label={shortenString(account)}>
        {shortenString(account)}
      </Button>
    );
  }
);
WalletUser.displayName = 'WalletUser';

const CopyToClipboardMenuItem: FC = () => {
  const { account } = useWeb3React();

  const { copy } = useClipboard({ timeout: 500 });

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  const onCopy = useCallback(() => {
    copy(account);
    showNotification(NOTIFICATIONS[NotificationsID.userCopied]);
  }, [account, copy]);

  return (
    <Menu.Item leftSection={<IconCopy size={18} />} onClick={onCopy}>
      {t('copy')}
    </Menu.Item>
  );
};

interface ViewOnExplorerMenuItemProps<T>{
  chains?: ChainSelectConfig<T>
}
function ViewOnExplorerMenuItem<T extends Chain>({ chains }: ViewOnExplorerMenuItemProps<T>){
  const { account } = useWeb3React();

  const c = chains ?? { allowedChains: ALLOWED_CHAINS, chainsConfig: CHAINS};
  const activeChain = useActiveChain(c);

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  if(!activeChain) return(<></>);

  return (
    <Menu.Item
      leftSection={<IconExternalLink size={18} />}
      component={Link}
      href={`${activeChain?.blockExplorerUrl}address/${account}`}
      target={'_blank'}
    >
      {t('viewOn')}
    </Menu.Item>
  );
};

const DisconnectMenuItem: FC = () => {
  const { connector } = useWeb3React();

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  const setProviderCookie = useSetAtom(providerAtom);

  const onDisconnect = useCallback(async () => {
    if (connector.deactivate) {
      await connector.deactivate();
    } else {
      await connector.resetState();
    }
    setProviderCookie("");
  }, [connector]);

  return (
    <Menu.Item leftSection={<IconLogout size={18} />} onClick={onDisconnect}>
      {t('disconnect')}
    </Menu.Item>
  );
};

const SelectedConnector = (props: FlexProps) => {

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  
  const provider = useAtomValue(providerAtom);

  const connectorData: ConnectorData|undefined = useMemo(() => {
    if(!provider) return undefined;
    const key = AvailableConnectors[provider as keyof typeof AvailableConnectors]
    return ConnectorsDatas.get(key)
  },[provider]);

  const title = connectorData?.connectorEnum == AvailableConnectors.readOnly ? t('readOnly.title') : connectorData?.title

  if(!connectorData) return <></>

  return(
    <Box style={(theme) => ({ padding: theme.spacing.sm })}>
      <Flex 
        {...props}
        style={{  backgroundColor: connectorData.color }}
        gap={'sm'}
      >
        <Image src={connectorData.src} alt={connectorData.title} fit={'contain'} h={30} />
        <Text c={'white'}>{title}</Text>
      </Flex> 
    </Box>
)
}

interface WalletMenuProps<T>{
}
export function WalletMenu<T extends Partial<Chain>>({  }: WalletMenuProps<T>){
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
        <Menu.Item component={SelectedConnector} />
        <CopyToClipboardMenuItem />
        <ViewOnExplorerMenuItem />
        <DisconnectMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};
