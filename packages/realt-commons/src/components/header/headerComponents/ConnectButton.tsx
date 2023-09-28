import { Button, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const ConnectButton: FC = () => {
    const modals = useModals();
  
    const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  
    const onOpenWalletModal = useCallback(() => {
      modals.openContextModal('wallet', {
        title: <Text>{t('title')}</Text>,
        innerProps: {},
      });
    }, [modals, t]);
  
    return (
      <Button aria-label={t('title')} onClick={onOpenWalletModal}>
        {t('title')}
      </Button>
    );
  };