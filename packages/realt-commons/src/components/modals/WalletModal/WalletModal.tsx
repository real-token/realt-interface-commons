import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';
import {
  Button,
  Flex,
  Image,
  LoadingOverlay,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { styles } from './WalletModal.styles';
import { useSetAtom } from 'jotai';
import { providerAtom } from '../../../states';
import { useRootStore } from '../../../providers/RealtProvider';
import { utils, ethers } from 'ethers';
import { AvailableConnectors, ConnectorData, ConnectorMap, ConnectorsDatas } from '../../../web3';
import { CHAINS, ChainsID } from '../../../config';

type WalletModalButtonProps = {
  onSuccess: () => void;
  disabled?: boolean;
  disabledError?: string;
  connectorMap: ConnectorMap;
  connectorData: ConnectorData
};
const WalletModalButton: FC<WalletModalButtonProps> = ({
  onSuccess,
  disabled = false,
  disabledError,
  connectorMap,
  connectorData
}) => {
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const { title, src, connectorKey, gradient } = connectorData;
  const connector = connectorMap.connector;

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
      w={300} 
      withArrow={true} 
      arrowSize	={12}
    >
    <Button
      aria-label={title}
      fullWidth={true}
      variant={'gradient'}
      rightSection={<Image src={src} alt={title} fit={'contain'} w={30} radius={'xl'} style={{filter: `blur(${blur}px)`}} />}
      styles={styles.button}
      onClick={disabled ? () => false : onActivating}
      gradient={gradient}
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

interface ReadOnlyAddressProps{
  title: string;
  onSuccess: () => void;
  connectorMap: ConnectorMap;
  connectorData: ConnectorData
}
export const ReadOnlyAddress = ({ onSuccess, connectorMap, connectorData }: ReadOnlyAddressProps) => {

  const { t } = useTranslation('common', { keyPrefix: "wallet.readOnly" });

  const [isActivating, setIsActivating] = useState<boolean>(false);

  const { connectorKey } = connectorData;
  const connector = connectorMap.connector;

  const setProviderCookie = useSetAtom(providerAtom);

  const [address, setAddress] = useState<string>(""); 
  useEffect(() => {
    if(address != "") return;
    setAddress(localStorage.getItem('readOnlyAddress') ?? "");
  },[localStorage])

  useEffect(() => {
    (async () => {
      if(!address.endsWith('.eth')) return;


      const rpc = CHAINS[ChainsID.Ethereum].rpcUrl;
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const resolvedAddress = await provider.resolveName(address);
      if(!resolvedAddress) return;
      setAddress(resolvedAddress);
    })()
  },[address])

  const onActivating = async () => {
    localStorage.setItem('readOnlyAddress', address)
    try{
      setIsActivating(true);
      // console.log('readOnlyAddress: ', localStorage.getItem('readOnlyAddress'))
      await connector.activate();
      setIsActivating(false);
      
      if(connectorKey) setProviderCookie(connectorKey)
      onSuccess();
    }catch(err){
      console.log(err)
      setIsActivating(false);
    }
  }

  const badAddress = address != "" && !utils.isAddress(address);

  return(
    <Flex direction={'column'} gap={'sm'}>
      <Text size={'md'} fw={700}>{t('title')}</Text>
      <Text size={'sm'}>{t('description')}</Text>
      <Flex direction={'column'} gap={'sm'}>
          <TextInput
              placeholder={t('inputPlaceholder').toString()}
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
              error={badAddress ? t('wrongAddressFormat') : undefined}
          />
          <Button
            onClick={() => onActivating()}
            disabled={badAddress || address == "" || isActivating}
            loading={isActivating}
          >
            {t('button')}
          </Button>
      </Flex>
    </Flex>
  )
}

export const WalletModal: FC<ContextModalProps> = ({ context, id }) => {
  const { t } = useTranslation('common', { keyPrefix: 'wallet' });

  const [gnosisDisabled,setGnosisDisabled] = useState<boolean>(true);

  const connectors = useRootStore((state) => state.connectors);

  if(!connectors) return <></>

  useEffect(() => {
    const fetchIfGnosis = async () => {
      try {
        const gnosisSdk = new SafeAppsSDK()
        const test = await gnosisSdk.safe.getInfo();
        console.log(test)
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
    <Flex direction={'column'} gap={'lg'}>
      {Array.from(connectors.keys()).map((connectorMapKey) => {

        const availableConnector = AvailableConnectors[connectorMapKey];

        const connectorMap = connectors.get(availableConnector);
        const connectorData = ConnectorsDatas.get(availableConnector);

        const isGnosis = connectorData?.connectorKey == ConnectorsDatas.get(AvailableConnectors.gnosisSafe)?.connectorKey;
        const isReadOnly = connectorData?.connectorKey == ConnectorsDatas.get(AvailableConnectors.readOnly)?.connectorKey

        if(!connectorData || !connectorMap) return <></>
        
        if(isReadOnly){
          return (
            <ReadOnlyAddress
              title={t('readOnly.title')}
              connectorMap={connectorMap}
              connectorData={connectorData}
              onSuccess={onClose}
              key={connectorData.connectorKey}
            />
          )
        }else{
          return (
            <WalletModalButton
              connectorMap={connectorMap}
              connectorData={connectorData}
              onSuccess={onClose}
              disabled={isGnosis ? gnosisDisabled : false}
              disabledError={isGnosis ? t('disabledGnosisSafe').toString() : undefined}
              key={connectorData.connectorKey}
            />
          )
        }
      })}
    </Flex>
  );
};