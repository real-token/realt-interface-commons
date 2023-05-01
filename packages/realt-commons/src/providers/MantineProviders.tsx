import { FC, ReactNode, useEffect, useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { modals } from '../components/modals';
import { modalStyles, theme as defaultTheme } from '../theme';

type Modals = Record<string,FC<ContextModalProps<any>>>

type MantineProvidersProps = {
  theme?: MantineThemeOverride;
  children: ReactNode;
  modals?: Modals
};

export const MantineProviders: FC<MantineProvidersProps> = ({
  children,
  theme,
  modals: customModals
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const t = theme ?? defaultTheme;

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
        theme={{ colorScheme, ...t }}
      >
          <Notifications/>
          <ModalsProvider
            modals={{ ...modals, ...customModals }}
            modalProps={{
              centered: true,
              withCloseButton: false,
              styles: modalStyles,
            }}
          >
            {children}
          </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
