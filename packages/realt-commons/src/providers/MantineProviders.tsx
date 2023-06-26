import { FC, ReactNode, useEffect, useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
  ModalProps,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { modals } from '../components/modals';
import { modalStyles as defaultModalStyles, theme as defaultTheme } from '../theme';

type Modals = Record<string,FC<ContextModalProps<any>>>

type MantineProvidersProps = {
  theme?: MantineThemeOverride;
  modalStyles?: ModalProps['styles'];
  children: ReactNode;
  modals?: Modals
};

export const MantineProviders: FC<MantineProvidersProps> = ({
  children,
  theme,
  modals: customModals,
  modalStyles
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const themeUsed = theme ?? defaultTheme;
  const modalStylesUsed = modalStyles ?? defaultModalStyles;

  useEffect(() => { 
    const themeColor = (getCookie('mantine-color-scheme') || 'dark') as ColorScheme;
    setColorScheme(themeColor);
  },[]);

  const toggleColorScheme = (
    nextColorScheme: ColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
  ) => {
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme);
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles={true}
        withNormalizeCSS={true}
        theme={{ colorScheme, ...themeUsed }}
      >
          <Notifications/>
          <ModalsProvider
            modals={{ ...modals, ...customModals }}
            modalProps={{
              centered: true,
              withCloseButton: false,
              styles: modalStylesUsed,
            }}
          >
            {children}
          </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
