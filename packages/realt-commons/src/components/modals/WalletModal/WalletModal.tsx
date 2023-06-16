import { FC, useCallback, useContext, useEffect, useState } from 'react';
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
import { styles } from './WalletModal.styles';
import { useSetAtom } from 'jotai';
import { providerAtom } from '../../../states';
import { RealtProvider } from '../../../providers';
import { gnosisSafeKey, metamaskKey, walletConnectV2Key } from '../../../web3';
import { useRootStore } from '../../../providers/RealtProvider';

type WalletModalButtonProps = {
  title: string;
  src: string;
  buttonProps: ButtonProps;
  onSuccess: () => void;
  disabled?: boolean;
  disabledError?: string;
  connectorKey: string;
  connector: Connector;
};
const WalletModalButton: FC<WalletModalButtonProps> = ({
  title,
  src,
  buttonProps,
  onSuccess,
  disabled = false,
  disabledError,
  connectorKey,
  connector
}) => {
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const connectors = useRootStore((state) => state.connectors);
  if(!connectors || !connectors[connectorKey]) return <></>;

  const setProviderCookie = useSetAtom(providerAtom);

  const onActivating = useCallback(async () => {
    try{
      setIsActivating(true);
      await connector.activate();
      setIsActivating(false);
      
      if(connectorKey) setProviderCookie(connectorKey)
      onSuccess();
    }catch(err){
      console.log(err)
    }
  }, [connector, connectorKey, onSuccess, setProviderCookie]);

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

  const connectors = useRootStore((state) => state.connectors);
  if(!connectors) return <></>
  
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
      {connectors.metamask ? (
        <WalletModalButton
          title={'MetaMask'}
          src={MetaMask}
          buttonProps={{ gradient: { from: '#CD6116', to: '#F6851B' } }}
          onSuccess={onClose}
          connectorKey={metamaskKey}
          connector={connectors.metamask.connector}
        />
      ) : undefined}
      {connectors.walletConnect ? (
        <WalletModalButton
          title={'WalletConnect V2'}
          src={WalletConnect}
          buttonProps={{ gradient: { from: '#006FFF', to: '#5C9DF5' } }}
          onSuccess={onClose}
          connectorKey={walletConnectV2Key}
          connector={connectors.walletConnect.connector}
        />
      ): undefined}
      {connectors.gnosisSafe ? (
        <WalletModalButton
          title={'GnosisSafe'}
          src={GnosisSafe}
          buttonProps={{ gradient: { from: '#005233', to: '#00bb55' } }}
          onSuccess={onClose}
          disabled={gnosisDisabled}
          disabledError={t('DisabledGnosisSafe') ?? ""}
          connectorKey={gnosisSafeKey}
          connector={connectors.gnosisSafe.connector}
        />
      ):undefined}
    </Stack>
  );
};