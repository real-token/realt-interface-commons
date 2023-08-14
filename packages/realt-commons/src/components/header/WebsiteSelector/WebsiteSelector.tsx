import { Title, createStyles, MantineTheme } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import { availableWebsites, Website, Websites } from "../../../types/website";
import { WebsitePane } from "./WebsitePane";

interface StylesParams{
  menuOpened: boolean;
  isDisabled: boolean;
}
const useStyles = createStyles((theme: MantineTheme, { menuOpened, isDisabled }: StylesParams) => ({
  root: {
    position: 'relative'
  },
  arrow: {
    transform: menuOpened && !isDisabled ? 'rotate(90deg)' : 'rotate(0)',
    transition: 'all 0.3s ease-in-out'
  },
  logoWithName: {
    minWidth: '320px',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: '5px 5px 0 0',
    padding: '10px',
    paddingLeft: '0px',
    backgroundColor: menuOpened && !isDisabled ? theme.colors.brand : 'transparent',
    '&:hover': {
      cursor: !isDisabled ? "pointer" : "unset"
    } 
  },
  websiteName: {
    color: menuOpened ? 'black' : theme.colorScheme == 'dark' ? "white" : "black"
  },
  websitesContainer: {
    borderTop: `2px solid ${menuOpened && !isDisabled ? 'black' : theme.colors.brand}`,
    zIndex: 99999999,
    width: '100%',
    position: 'absolute',
    display: 'flex',
    marginTop: '-1px',
    padding: '10px',
    gap: theme.spacing.sm,
    borderRadius: '0 0 5px 5px',
    visibility: menuOpened ? 'inherit' : 'hidden',
    flexDirection: 'column',
    backgroundColor: menuOpened && !isDisabled? theme.colors.brand : 'transparent',
  },
  divider: {
    height: '3px',
    width: '70%',
    backgroundColor: 'black'
  }
}));
  
interface WebsiteSelectorProps{
    current?: Websites
    newWebsite?: Website
    isDisabled?: boolean;
}
export const WebsiteSelector = ({ current, newWebsite, isDisabled = false } : WebsiteSelectorProps) => {

  const [menuOpened,setMenuOpened] = useState<boolean>(false);

  const currentWebsite = newWebsite ?? (current ? availableWebsites.get(current) : undefined);

  const { classes } = useStyles({ menuOpened, isDisabled });

  if(!currentWebsite) return <></>;

  return(
    <div
      className={classes.root}
      onMouseEnter={() => { if(!isDisabled) setMenuOpened(true) }}
      onMouseLeave={() => { if(!isDisabled) setMenuOpened(false) }}
    >
      <div className={classes.logoWithName}>
        {!isDisabled ? <IconChevronRight className={classes.arrow} /> : undefined}
        { currentWebsite.logo ? React.createElement(currentWebsite.logo) : undefined }
        <Title order={3} className={classes.websiteName}>{currentWebsite.name}</Title>
      </div>
      <div className={classes.websitesContainer}>
        {Array.from(availableWebsites.values()).filter((website) => website.id !== current).map((website) => (
          <WebsitePane key={website.id} website={website} /> 
        ))}
      </div>
    </div>
  )
}