import { FC, ReactNode } from 'react';
import {
  MantineProvider,
  MantineThemeOverride,
  ModalProps,
} from '@mantine/core';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import { Notifications, NotificationsProps } from '@mantine/notifications';
import { modalStyles as defaultModalStyles, theme as defaultTheme } from '../theme';

type Modals = Record<string,FC<ContextModalProps<any>>>

type MantineProvidersProps = {
  theme?: MantineThemeOverride;
  modalStyles?: ModalProps['styles'];
  children: ReactNode;
  modals?: Modals
  notificationsProps?: NotificationsProps
};

export const MantineProviders: FC<MantineProvidersProps> = ({
  children,
  theme,
  modals: customModals,
  modalStyles,
  notificationsProps
}) => {

  const themeUsed = theme ?? defaultTheme;
  const modalStylesUsed = modalStyles ?? defaultModalStyles;
  
  return (
    <MantineProvider
      theme={{ ...themeUsed }}
    >
      <Notifications {...notificationsProps}/>
      <ModalsProvider
        modals={{ ...customModals }}
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
