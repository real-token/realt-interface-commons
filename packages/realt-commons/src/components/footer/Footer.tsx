import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Group,
  Text,
  Title,
  Flex,
  ActionIcon,
  Divider
} from '@mantine/core';

import React from 'react';
import { BrandDiscord, BrandGithub, BrandMedium, BrandTelegram, BrandTwitter } from "tabler-icons-react"
import { Link } from '../link';
import { Logo } from '../../assets';
import classes from "./Footer.module.css"

interface LogoWithNameProps{
  name: string;
  logo: FC<any>;
}
const LogoWithName: FC<LogoWithNameProps> = ({ logo, name }) => {
  return (
    <Group align={'center'} gap={'xs'}>
      {React.createElement(logo)}
      <Title order={3}>{name}</Title>
    </Group>
  );
};

const Copyright = ({ text } : { text: string }) => {
  return (
    <Text size={'sm'} mt={5}>
      {text}
    </Text>
  );
}

const FooterButtons: FC<{ links?: FooterLinks }> = ({ links }) => {
  if(!links) return <></>

  return (
    <Group>
      {/* <ActionIcon 
        variant={'subtle'}
        component={Link}
        target={'_blank'}
        href={"/faq"}
      >
        {t("footer.faq")}
      </ActionIcon> */}

      {links.twitter ? (
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={links.twitter}
          aria-label={'Twitter'}
          target={'_blank'}
          color={'#e9ecef'}
        >
          <BrandTwitter/>
        </ActionIcon>
      ): undefined}

      {links.discord ? (
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={links.discord}
          aria-label={'Discord'}
          target={'_blank'}
          color={'#e9ecef'}
        >
          <BrandDiscord />
        </ActionIcon>
      ): undefined}

      {links.telegram ? (
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={links.telegram}
          aria-label={'Telegram'}
          target={'_blank'}
          color={'#e9ecef'}
        >
          <BrandTelegram />
        </ActionIcon>
      ): undefined}

      {links.github ? (
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={links.github}
          aria-label={'GitHub'}
          target={'_blank'}
          color={'#e9ecef'}
        >
          <BrandGithub />
        </ActionIcon>
      ): undefined}

      {links.medium ? (
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={links.medium}
          aria-label={'Blog'}
          target={'_blank'}
          color={'#e9ecef'}
        >
          <BrandMedium />
        </ActionIcon>
      ): undefined}
    </Group>
  );
};

export interface FooterLinks{
  twitter?: string;
  discord?: string;
  telegram?: string;
  github?: string;
  medium?: string;
}

export interface FooterParam{
  copyright: string;
  logo: FC<any>;
  name: string;
  links?: FooterLinks
}

export interface FooterProps{
  param?: FooterParam
  customLinks?: JSX.Element
}

export const Footer: FC<FooterProps> = ({ param: footerParam, customLinks }) => {

  const { t } = useTranslation('common', { keyPrefix: 'footer' });

  const param = footerParam ?? {
    copyright: t('copyright', { year: new Date().getFullYear() }),
    logo: Logo,
    name: 'RealToken',
    links: {
      twitter: 'https://twitter.com/RealTPlatform/',
      discord: 'https://discord.gg/9fQz6jYmcT',
      telegram: 'https://t.me/Realtoken_welcome/',
      github: 'https://github.com/real-token',
      medium: 'https://realt.co/blog/'
    }
  };

  return (
    <div>
      <Divider />
      <Box className={classes.container}>
        <Flex justify={'space-around'} align={'center'} gap={'md'}>
          <Flex className={classes.infosContainer}>
            <LogoWithName logo={param.logo} name={param.name}/>
            <Flex className={classes.copyright}>
              <Copyright text={param.copyright}/>
            </Flex>
          </Flex>
          {customLinks ?? undefined}
          <FooterButtons links={param.links}/>
        </Flex>
        {/* <MediaQuery largerThan={'xs'} styles={{ display: 'none' }}>
          <Copyright param={}/>
        </MediaQuery> */}
      </Box>
    </div>
  );
};
