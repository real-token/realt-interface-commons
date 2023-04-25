import { FC, ReactNode, useEffect, useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { modals } from '../components/modals';
import { modalStyles } from '../theme';

type MantineProvidersProps = {
  theme: MantineThemeOverride;
  children: ReactNode;
};

export const MantineProviders: FC<MantineProvidersProps> = ({
  children,
  theme
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

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
        theme={{ colorScheme, ...theme }}
      >
          <Notifications/>
          <ModalsProvider
            modals={modals}
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
