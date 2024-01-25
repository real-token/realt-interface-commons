import { ReactNode } from 'react';
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
};

export function Layout<T extends Partial<Chain>>({ children, currentWebsite, chains, newWebsite, headerNav, head, disableHeaderMultisite, footerParam, footerCustomLinks }: LayoutProps<T>){

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
      <Footer param={footerParam} customLinks={footerCustomLinks}/>
    </div>
  );
};
