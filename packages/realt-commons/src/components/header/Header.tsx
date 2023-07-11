import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Group,
  MediaQuery,
  Title,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useWeb3React } from '@web3-react/core';
import { headerStyles as styles } from './Header.styles';
import { Divider } from '../divider/Divider';
import { SettingsMenu } from '../menus/SettingsMenu';
import { WalletMenu } from '../menus/WalletMenu';
import { NetworkMenu } from '../menus/NetworkMenu';
import { MessageNetwork } from '../chainSelect/chainSelect'
import { Logo } from '../../assets';
import { Website, WebsitePane, Websites, WebsiteSelector } from './WebsiteSelector';
import { Chain, ChainSelectConfig } from '../../types';

const LogoWithName: FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'header' });

  return (
    <Group align={'center'} spacing={'xs'}>
      <Logo />
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

interface HeaderButtonsProps<T> {
  chains?: ChainSelectConfig<T>
}
function HeaderButtons<T extends Partial<Chain>>({ chains }: HeaderButtonsProps<T>) {
  const { account } = useWeb3React();

  return (
    <Group spacing={10}>
      <NetworkMenu chains={chains} />
      {account ? <WalletMenu /> : <ConnectButton />}
      <SettingsMenu />
    </Group>
  );
};

interface HeaderProps<T> {
  headerNav?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  chains?: ChainSelectConfig<T>;
  disableHeaderMultisite?: boolean;
}
export function Header<T extends Partial<Chain>>({ currentWebsite, chains, newWebsite, headerNav, disableHeaderMultisite = false }: HeaderProps<T>) {

  if(disableHeaderMultisite && !newWebsite) throw new Error("Cannot use disableHeaderMultisite whiteout setting newWebsite parameter.");

  return (
    <>
      <MessageNetwork classeName={styles.message} chains={chains}/>
      <Box sx={styles.container}>
        <Group position={'apart'} align={'center'}>
          <WebsiteSelector current={currentWebsite} newWebsite={newWebsite} isDisabled={disableHeaderMultisite}/>
          {headerNav ?? undefined}
          <HeaderButtons chains={chains} />
        </Group>
      </Box>
      <Divider />
    </>
  );
};
