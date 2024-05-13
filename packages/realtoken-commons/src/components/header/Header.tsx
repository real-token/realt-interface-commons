import { MessageNetwork } from '../chainSelect/ChainSelect'
import { Website, Websites, WebsiteSelector } from './WebsiteSelector';
import { MobileHeaderWrapper } from './MobileHeaderWrapper/MobileHeaderWrapper';
import { HeaderButtons } from './headerComponents/HeaderButtons';
import classes from "./Header.module.css"
import { Divider } from '../divider/Divider';

interface HeaderProps{
  headerNav?: React.ReactElement;
  currentWebsite?: Websites;
  newWebsite?: Website;
  disableHeaderMultisite?: boolean;
  banner?: React.ReactElement;
}
export function Header({ currentWebsite, newWebsite, headerNav, disableHeaderMultisite = false, banner }: HeaderProps) {

  if(disableHeaderMultisite && !newWebsite) throw new Error("Cannot use disableHeaderMultisite whitout setting newWebsite parameter.");

  return (
    <>
      {banner ? banner : undefined}
      <MessageNetwork classeName={classes.message}/>
      <MobileHeaderWrapper
        selector={
          <WebsiteSelector current={currentWebsite} newWebsite={newWebsite} isDisabled={disableHeaderMultisite}/>
        }
        nav={headerNav ?? undefined}
        buttons={<HeaderButtons/>}
      />
      <Divider />
    </>
  );
};
