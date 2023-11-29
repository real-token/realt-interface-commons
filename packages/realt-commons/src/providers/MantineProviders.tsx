import { FC, ReactNode } from 'react';
import {
  MantineProvider,
  MantineThemeOverride,
  ModalProps,
} from '@mantine/core';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { modals } from '../components/modals';
import { modalStyles as defaultModalStyles, theme as defaultTheme } from '../theme';
import { ColorSchemeManager } from '../components/ColorSchemeManager/ColorSchemeManager';

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

  const themeUsed = theme ?? defaultTheme;
  const modalStylesUsed = modalStyles ?? defaultModalStyles;
  
  return (
    <MantineProvider
      theme={{ ...themeUsed }}
      defaultColorScheme="auto"
    >
      <ColorSchemeManager />
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
  );
};
