import { FC, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionIcon,
  Box,
  Group,
  Image,
  MediaQuery,
  Text,
  TextProps,
  Title,
} from '@mantine/core';

import { Divider } from '../divider/Divider';
import { footerStyles as styles } from './Footer.styles';
import { FRC } from '../../types/FRC';
import { Logo } from '../../assets';

const LogoWithName: FC = () => {
  return (
    <Group align={'center'} spacing={'xs'}>
      {/* <Image src={Logo.src} alt={'RealT Logo'} width={30} /> */}
      <Logo />
      <Title order={3}>{'RealT'}</Title>
    </Group>
  );
};

const Copyright: FRC<TextProps, HTMLDivElement> = forwardRef((props, ref) => {
  const { t } = useTranslation('common', { keyPrefix: 'footer' });

  return (
    <Text {...props} ref={ref}>
      {t('copyright', { year: new Date().getFullYear() })}
    </Text>
  );
});
Copyright.displayName = 'Copyright';

export const Footer: FC = () => {

  const { t } = useTranslation("common");

  const FooterButtons: FC = () => {
    return (
      <Group>
        {/* <ActionIcon 
          variant={'subtle'}
          component={Link}
          href={"/faq"}
        >
          {t("footer.faq")}
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={'https://twitter.com/RealTPlatform/'}
          aria-label={'Twitter'}
          target={'_blank'}
        >
          <IconBrandTwitter />
        </ActionIcon>

        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={'https://discord.gg/9fQz6jYmcT'}
          aria-label={'Discord'}
          target={'_blank'}
        >
          <IconBrandDiscord />
        </ActionIcon>


        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={'https://t.me/Realtoken_welcome/'}
          aria-label={'Telegram'}
          target={'_blank'}
        >
          <IconBrandTelegram />
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={'https://realt.co/blog/'}
          aria-label={'Blog'}
          target={'_blank'}
        >
          <IconBrandMedium />
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          component={Link}
          href={'https://github.com/real-token'}
          aria-label={'GitHub'}
          target={'_blank'}
        >
          <IconBrandGithub />
        </ActionIcon> */}
      </Group>
    );
  };

  return (
    <div>
      <Divider />
      <Box sx={styles.container}>
        <Group position={'apart'} align={'center'}>
          <LogoWithName />
          <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
            <Copyright />
          </MediaQuery>
          <FooterButtons />
        </Group>
        <MediaQuery largerThan={'xs'} styles={{ display: 'none' }}>
          <Copyright size={'sm'} mt={5} />
        </MediaQuery>
      </Box>
    </div>
  );
};
