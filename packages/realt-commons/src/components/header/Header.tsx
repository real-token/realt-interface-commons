import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Group,
  Image,
  MediaQuery,
  Title,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useWeb3React } from '@web3-react/core';
import { headerStyles as styles } from './Header.styles';
import { Divider } from '../divider/Divider';
import { SettingsMenu } from '../menus/SettingsMenu';
import { WalletMenu } from '../menus/WalletMenu';
import { Logo } from '../../assets';
import { Website, Websites, WebsiteSelector } from './WebsiteSelector';

const LogoWithName: FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'header' });

  return (
    <Group align={'center'} spacing={'xs'}>
      <Logo/>
      <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
        <Title order={3}>{t('title')}</Title>
      </MediaQuery>
    </Group>
  );
};

const ConnectButton: FC = () => {
  const modals = useModals();

  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  const onOpenWalletModal = useCallback(() => {
    modals.openContextModal('wallet', {
      title: <Title order={3}>{t('title')}</Title>,
      innerProps: {},
    });
  }, [modals, t]);

  return (
    <Button aria-label={t('title')} onClick={onOpenWalletModal}>
      {t('title')}
    </Button>
  );
};

const HeaderButtons: FC = () => {
  const { account } = useWeb3React();

  return (
    <Group spacing={10}>
      {account ? <WalletMenu /> : <ConnectButton />}
      <SettingsMenu />
    </Group>
  );
};

interface HeaderProps{
  children?: React.ReactNode;
  currentWebsite: Websites;
}
export const Header: FC<HeaderProps> = ({ children, currentWebsite }) => {
  return (
    <>
      <Box sx={styles.container}>
        <Group position={'apart'} align={'center'}>
          <WebsiteSelector current={currentWebsite} />
          <>
          {children ?? undefined}
          </>
          <HeaderButtons />
        </Group>
      </Box>
      <Divider/>
    </>
  );
};
