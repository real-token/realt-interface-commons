import { createStyles } from '@mantine/core';
import { ReactNode } from 'react';
import { Footer, FooterParam, Header, Website, Websites } from '..';
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
  disableHeaderMultisite?: boolean;
  head?: React.ReactElement;
  currentWebsite?: Websites;
  chains?: ChainSelectConfig<T>|undefined;
  newWebsite?: Website;
  footerParam?: FooterParam;
};

export function Layout<T extends Partial<Chain>>({ children, currentWebsite, chains, newWebsite, headerNav, head, disableHeaderMultisite, footerParam }: LayoutProps<T>){

  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {head ?? undefined}
      <Header 
        currentWebsite={currentWebsite} 
        chains={chains} 
        newWebsite={newWebsite} 
        headerNav={headerNav}
        disableHeaderMultisite={disableHeaderMultisite}
      />
      <div className={classes.main}>
        {children}
      </div>
      <Footer param={footerParam}/>
    </div>
  );
};
