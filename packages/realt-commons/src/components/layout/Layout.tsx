import { createStyles } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { Footer, Header, Website, Websites } from '..';
import { Chain, ChainSelectConfig } from '../../types';

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
    padding: `0 ${theme.spacing.xl}`
  }
}));

type LayoutProps<T> = { 
  children: ReactNode,
  headerNav?: React.ReactElement;
  currentWebsite?: Websites;
  chains?: ChainSelectConfig<T>|undefined;
  newWebsite?: Website;
};

export function Layout<T extends Partial<Chain>>({ children, currentWebsite, chains, newWebsite, headerNav }: LayoutProps<T>){

  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Header currentWebsite={currentWebsite} chains={chains} newWebsite={newWebsite} headerNav={headerNav}/>
      <div className={classes.main}>
        {children}
      </div>
      <Footer />
    </div>
  );
};
