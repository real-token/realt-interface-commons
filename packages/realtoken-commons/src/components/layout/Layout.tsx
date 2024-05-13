import { ReactNode } from 'react';
import { Footer, FooterParam, Header, Website, Websites } from '..';
import classes from './Layout.module.css';

type LayoutProps = { 
  children: ReactNode,
  headerNav?: React.ReactElement;
  disableHeaderMultisite?: boolean;
  head?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  footerParam?: FooterParam;
  footerCustomLinks?: JSX.Element;
  headerBanner?: React.ReactElement;
};

export function Layout({ children, currentWebsite, newWebsite, headerNav, head, disableHeaderMultisite, footerParam, footerCustomLinks, headerBanner }: LayoutProps){

  // TODO: move this to new logic when refactor
  // useEffect(() => {
  //   if(!chains) return
  //   if(chains.allowedChains.length !== Object.keys(chains.chainsConfig).length) throw new Error('Allowed chains and chains config must have the same length')
  // },[chains])

  return (
    <div className={classes.container}>
      {head ?? undefined}
      <Header
        currentWebsite={currentWebsite} 
        newWebsite={newWebsite} 
        headerNav={headerNav}
        disableHeaderMultisite={disableHeaderMultisite}
        banner={headerBanner}
      />
      <div className={classes.main}>
        {children}
      </div>
      <Footer param={footerParam} customLinks={footerCustomLinks}/>
    </div>
  );
};
