import { ReactNode, useEffect } from 'react';
import { Footer, FooterParam, Header, Website, Websites } from '..';
import { Chain, ChainSelectConfig } from '../../types';
import classes from './Layout.module.css';

type LayoutProps<T> = { 
  children: ReactNode,
  headerNav?: React.ReactElement;
  disableHeaderMultisite?: boolean;
  head?: React.ReactElement;
  currentWebsite?: Websites;
  chains?: ChainSelectConfig<T>|undefined;
  newWebsite?: Website;
  footerParam?: FooterParam;
  footerCustomLinks?: JSX.Element;
  headerBanner?: React.ReactElement;
  headerButtons?: React.ReactElement;
};

export function Layout<T extends Partial<Chain>>({ 
  children, currentWebsite, chains, newWebsite, headerNav, head, disableHeaderMultisite, footerParam, footerCustomLinks, headerBanner, headerButtons 
}: LayoutProps<T>){

  // TODO: move this to new logic when refactor
  useEffect(() => {
    if(!chains) return
    if(chains.allowedChains.length !== Object.keys(chains.chainsConfig).length) throw new Error('Allowed chains and chains config must have the same length')
  },[chains])

  return (
    <div className={classes.container}>
      {head ?? undefined}
      <Header
        currentWebsite={currentWebsite} 
        chains={chains} 
        newWebsite={newWebsite} 
        headerNav={headerNav}
        disableHeaderMultisite={disableHeaderMultisite}
        banner={headerBanner}
        headerButtons={headerButtons}
      />
      <div className={classes.main}>
        {children}
      </div>
      <Footer param={footerParam} customLinks={footerCustomLinks}/>
    </div>
  );
};
