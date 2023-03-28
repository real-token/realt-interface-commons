import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';
import {
  Anchor,
  Button,
  ButtonProps,
  Flex,
  Image,
  LoadingOverlay,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { Connector } from '@web3-react/types';
import { GnosisSafe, MetaMask, WalletConnect } from '../../../assets';
import { gnosisSafe, metaMask, walletConnect } from '../../../web3/connectors';
import { styles } from './WalletModal.styles';
import { useSetAtom } from 'jotai';
import { providerAtom } from '../../../states';

type WalletModalButtonProps = {
  connector: Connector;
  title: string;
  src: string;
  buttonProps: ButtonProps;
  onSuccess: () => void;
  disabled?: boolean;
  disabledError?: string;
  cookieValue?: string;
};

const WalletModalButton: FC<WalletModalButtonProps> = ({
  connector,
  title,
  src,
  buttonProps,
  onSuccess,
  disabled = false,
  disabledError,
  cookieValue
}) => {
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const setProviderCookie = useSetAtom(providerAtom);

  const onActivating = useCallback(async () => {

    try{
      setIsActivating(true);
      await connector.activate();
      setIsActivating(false);
      onSuccess();

      if(cookieValue) setProviderCookie(cookieValue)
    }catch(err){
      console.log(err)
    }
  }, [connector, cookieValue, onSuccess, setProviderCookie]);

  const blur = disabled ? 2 : 0;
  return (
    <Tooltip 
      label={`${disabledError}`} 
      disabled={!disabled} 
      multiline={true} 
      color={"#5e0000"}  
      position={"bottom"} 
      width={300} 
      withArrow={true} 
      arrowSize	={12}
    >
    <Button
      aria-label={title}
      fullWidth={true}
      variant={'gradient'}
      rightIcon={<Image src={src} alt={title} fit={'contain'} width={30} radius={'xl'} style={{filter: `blur(${blur}px)`}} />}
      styles={styles.button}
      onClick={disabled ? () => false : onActivating}
      {...buttonProps}
      //disabled={disabled}
    >
      <Flex direction={"column"}>
        <LoadingOverlay
          visible={isActivating}
          loaderProps={{ size: 'sm', variant: 'dots' }}
        />
        {
          disabled ?  <Text hidden={!disabled} style={{filter: `blur(${blur/2}px)`}}>{title}</Text> : title
        }
      </Flex>
    </Button>
    </Tooltip>
  );
};

export const WalletModal: FC<ContextModalProps> = ({ context, id }) => {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  const [gnosisDisabled,setGnosisDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchIfGnosis = async () => {
      try {
        const gnosisSdk = new SafeAppsSDK()
        await gnosisSdk.safe.getInfo();
        setGnosisDisabled(false);
      } catch (e) {
        console.log('Gnosis Safe is not detected', e);
      }
    }
    fetchIfGnosis();
  },[])

  const onClose = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  return (
    <Stack justify={'center'} align={'center'}>
      <WalletModalButton
        connector={metaMask}
        title={'MetaMask'}
        src={MetaMask}
        buttonProps={{ gradient: { from: '#CD6116', to: '#F6851B' } }}
        onSuccess={onClose}
        cookieValue={"metamask"}
      />
      <WalletModalButton
        connector={walletConnect}
        title={'WalletConnect'}
        src={WalletConnect}
        buttonProps={{ gradient: { from: '#006FFF', to: '#5C9DF5' } }}
        onSuccess={onClose}
        cookieValue={"wallet-connect"}
      />
      <WalletModalButton
        connector={gnosisSafe}
        title={'GnosisSafe'}
        src={GnosisSafe}
        buttonProps={{ gradient: { from: '#005233', to: '#00bb55' } }}
        onSuccess={onClose}
        disabled={gnosisDisabled}
        disabledError={t('DisabledGnosisSafe') ?? ""}
        cookieValue={"gnosis-safe"}
      />
      {/* <Anchor component={NextLink} href={t('href')} target={'_blank'}>
        {t('text')}
      </Anchor> */}
    </Stack>
  );
};