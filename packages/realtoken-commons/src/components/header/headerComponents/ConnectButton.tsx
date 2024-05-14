import { Button } from "@mantine/core";
import { FC } from "react";
import { useWeb3Modal } from '@web3modal/ethers5/react'
import { useTranslation } from "react-i18next";

export const ConnectButton: FC = () => {
  const { open } = useWeb3Modal()
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });
  
  return (
    <Button aria-label={t('title')} onClick={() => open()}>
      {t('title')}
    </Button>
  );
};