import { ReactNode } from 'react';
import { Footer, FooterParam, Header, Website, Websites } from '..';
import { Chain, ChainSelectConfig } from '../../types';
import classes from './Layout.module.css';
import { ColorSchemeScript } from '@mantine/core';

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

  return (
    <div className={classes.container}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
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
