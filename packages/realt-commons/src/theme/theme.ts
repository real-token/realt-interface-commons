import { MantineTheme, MantineThemeOverride, ModalProps } from '@mantine/core';

export const modalStyles: ModalProps['styles'] = {
  header: { justifyContent: 'center' },
  body: {
    // margin: '100px auto',
    width: "auto",
    maxWidth: "700px"
  },
  root: {
    zIndex: 10
  },
  overlay: {
    zIndex: 10
  },
  inner: {
    zIndex: 10
  }
};

export const theme: MantineThemeOverride = {
  colors: {
    brand: [
      '#F6CA79',
      '#F5BC51',
      '#F4B43E',
      '#F3AD2B',
      '#F2A91E',
      '#E79B0D',
      '#D48E0C',
      '#C1810B',
      '#AE740A',
      '#9A6709',
    ],
  },
  primaryColor: 'brand',
  defaultGradient: { deg: 90, from: '#F6CA79', to: '#E79B0D' },
  defaultRadius: 'md',
  cursorType: 'pointer',
  components: {
    ActionIcon: { defaultProps: { variant: 'filled' } },
  },
  other: {
    border: (theme: MantineTheme) =>
      `thin solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
  },
};
