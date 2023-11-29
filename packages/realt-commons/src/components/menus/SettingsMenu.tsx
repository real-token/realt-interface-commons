import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionIcon,
  Box,
  Center,
  Menu,
  SegmentedControl,
  useMantineColorScheme,
  Text,
  Flex,
  Combobox,
  InputBase,
  Input,
  useCombobox
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { US, FR, ES, FlagComponent } from 'country-flag-icons/react/3x2'
import { IconMoon, IconSettings, IconSun, IconLanguage } from '@tabler/icons';
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

interface Language{
  image: FlagComponent;
  label: string;
  value: string;
}

const LanguageSelect: FC = () => {
  const { i18n, t } = useTranslation('common', { keyPrefix: 'settings' });

  const updateLocale = useCallback(
    (updatedLocale: string|null) => {
      if (updatedLocale && i18n.language !== updatedLocale) {
        setCookies('react-i18next', updatedLocale);
        i18n.changeLanguage(updatedLocale);
      }
    },
    [i18n]
  );

  const data: Language[] = [
    { value: 'en', label: t('english') ?? "", image: US },
    { value: 'fr', label: t('french') ?? "", image: FR },
    { value: 'es', label: t('spanish') ?? "", image: ES },
  ]

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = data.map(({ image: Image, value, label }) => (
    <Combobox.Option value={value} key={value}>
      <Flex gap={10} align={'center'}>
        <Image style={{ width: '1.3rem' }}/>
        <Text>{label}</Text>
      </Flex>
    </Combobox.Option>
  ));

  return (
    <>
      <Menu.Label pb={0}>{t('title')}</Menu.Label>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          updateLocale(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type={'button'}
            pointer
            rightSection={<Combobox.Chevron />}
            leftSection={<IconLanguage size={16}/>}
            onClick={() => combobox.toggleDropdown()}
          >
            {i18n.language ? (
              <Text>{data.find((lng) => lng.value == i18n.language)?.label ?? i18n.language}</Text>
            ): (
              <Input.Placeholder>Pick value</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
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
