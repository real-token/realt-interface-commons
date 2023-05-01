import { createStyles } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { Footer, Header, Websites } from '../components';
import { Chain, ChainSelectConfig } from '../types';

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: '100vh'
  },
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    padding: `0 ${theme.spacing.xl}px`
  }
}));

type LayoutProps<T> = { 
  children: ReactNode, 
  currentWebsite: Websites;
  chains?: ChainSelectConfig<T>|undefined;
};

export function Layout<T extends Partial<Chain>>({ children, currentWebsite, chains }: LayoutProps<T>){

  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Header currentWebsite={currentWebsite} chains={chains}/>
      <div className={classes.main}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
