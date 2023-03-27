import { Sx } from '@mantine/core';

type Styles = {
  container: Sx;
};

export const footerStyles: Styles = {
  container: (theme) => ({
    [theme.fn.smallerThan('xs')]: {
      padding: theme.spacing.xs,
    },

    [theme.fn.largerThan('xs')]: {
      padding: theme.spacing.md,
    },
  }),
};
