import { FC, forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Box,
  Center,
  Menu,
  SegmentedControl,
  Select,
  useMantineColorScheme,
  Text,
  Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { US, FR, ES, FlagComponent } from 'country-flag-icons/react/3x2'
import { IconLanguage, IconMoon, IconSettings, IconSun } from '@tabler/icons';
import { setCookies } from 'cookies-next';

const ColorSchemeMenuItem: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const { t } = useTranslation('common', { keyPrefix: 'settings' });

  return (
    <Box px={5}>
      <SegmentedControl
        color={'brand'}
        fullWidth={true}
        value={colorScheme}
        onChange={() => toggleColorScheme()}
        data={[
          {
            value: 'light',
            label: (
              <Center>
                <IconSun size={16} />
                <Box ml={'xs'}>{t('light')}</Box>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center>
                <IconMoon size={16} />
                <Box ml={'xs'}>{t('dark')}</Box>
              </Center>
            ),
          },
        ]}
      />
    </Box>
  );
};

const LanguageSelect: FC = () => {
  const { i18n, t } = useTranslation('common', { keyPrefix: 'settings' });

  const updateLocale = useCallback(
    (updatedLocale: string) => {
      if (i18n.language !== updatedLocale) {
        setCookies('react-i18next', updatedLocale);
        i18n.changeLanguage(updatedLocale);
      }
    },
    [i18n]
  );

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: FlagComponent;
    label: string;
    value: string;
  }

  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image: Image, label, value, ...others }: ItemProps, ref) => (
      <Flex gap={10} ref={ref} {...others} align={'center'}>
        <Image style={{ width: '1.3rem' }}/>
        <Text>{label}</Text>
      </Flex>
    )
  );

  const data: ItemProps[] = [
    { value: 'en', label: t('english') ?? "", image: US },
    { value: 'fr', label: t('french') ?? "", image: FR },
    { value: 'es', label: t('spanish') ?? "", image: ES },
  ]

  return (
    <>
      <Menu.Label pb={0}>{t('title')}</Menu.Label>
      <Select
        p={5}
        value={i18n.language}
        onChange={updateLocale}
        itemComponent={SelectItem}
        data={data}
        icon={<IconLanguage size={16} />}
      />
    </>
  );
};

export const SettingsMenu: FC = () => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <Menu
      closeOnItemClick={false}
      opened={isOpen}
      onOpen={handlers.open}
      onClose={handlers.close}
    >
      <Menu.Target>
        <ActionIcon size={36} color={'brand'}>
          <IconSettings size={20} aria-label={'Setting'} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <LanguageSelect />
        <Menu.Divider />
        <ColorSchemeMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};
