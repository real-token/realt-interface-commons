import { MessageNetwork } from '../chainSelect/chainSelect'
import { Website, Websites, WebsiteSelector } from './WebsiteSelector';
import { Chain, ChainSelectConfig } from '../../types';
import { MobileHeaderWrapper } from './MobileHeaderWrapper/MobileHeaderWrapper';
import { HeaderButtons } from './headerComponents/HeaderButtons';
import classes from "./Header.module.css"
import { Divider } from '../divider/Divider';

interface HeaderProps<T> {
  headerNav?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  chains?: ChainSelectConfig<T>;
  disableHeaderMultisite?: boolean;
  banner?: React.ReactElement;
  headerButtons?: React.ReactElement;
}
export function Header<T extends Partial<Chain>>({ currentWebsite, chains, newWebsite, headerNav, disableHeaderMultisite = false, banner, headerButtons }: HeaderProps<T>) {

  if(disableHeaderMultisite && !newWebsite) throw new Error("Cannot use disableHeaderMultisite whitout setting newWebsite parameter.");

  return (
    <>
      {banner ? banner : undefined}
      <MessageNetwork classeName={classes.message} chains={chains}/>
      <MobileHeaderWrapper
        selector={
          <WebsiteSelector current={currentWebsite} newWebsite={newWebsite} isDisabled={disableHeaderMultisite}/>
        }
        nav={headerNav ?? undefined}
        buttons={
          headerButtons ?? <HeaderButtons chains={chains} />
        }
      />
      <Divider />
    </>
  );
};
