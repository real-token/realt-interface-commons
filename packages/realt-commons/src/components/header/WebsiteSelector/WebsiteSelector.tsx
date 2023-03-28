import { MediaQuery, Title, createStyles, MantineTheme, Flex } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import { availableWebsites, Websites } from "./website";
import { WebsitePane } from "./WebsitePane";

interface StylesParams{
  menuOpened: boolean;
}
const useStyles = createStyles((theme: MantineTheme, { menuOpened }: StylesParams) => ({
  root: {
    position: 'relative'
  },
  arrow: {
    transform: menuOpened ? 'rotate(90deg)' : 'rotate(0)',
    transition: 'all 0.3s ease-in-out'
  },
  logoWithName: {
    minWidth: '320px',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: '5px 5px 0 0',
    padding: '10px',
    paddingLeft: '20px',
    backgroundColor: menuOpened ? theme.colors.brand : 'transparent',
    '&:hover': {
      cursor: "pointer"
    } 
  },
  websiteName: {
    color: menuOpened ? 'black' : 'white'
  },
  websitesContainer: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    marginTop: '-1px',
    padding: '10px',
    gap: theme.spacing.sm,
    borderRadius: '0 0 5px 5px',
    visibility: menuOpened ? 'inherit' : 'hidden',
    flexDirection: 'column',
    backgroundColor: menuOpened ? theme.colors.brand : 'transparent',
  },
  divider: {
    height: '3px',
    width: '70%',
    backgroundColor: 'black'
  }
}));
  
interface WebsiteSelectorProps{
    current: Websites
}
export const WebsiteSelector = ({ current } : WebsiteSelectorProps) => {

  const [menuOpened,setMenuOpened] = useState<boolean>(false);

  const currentWebsite = availableWebsites.get(current);

  const { classes } = useStyles({ menuOpened });

  if(!currentWebsite) return <></>;

  return(
    <div
      className={classes.root}
      onMouseEnter={() => setMenuOpened(true)}
      onMouseLeave={() => setMenuOpened(false)}
    >
      <div className={classes.logoWithName}>
        <IconChevronRight className={classes.arrow} />
        { currentWebsite.logo ? React.createElement(currentWebsite.logo) : undefined }
        <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
          <Title order={3} className={classes.websiteName}>{currentWebsite.name}</Title>
        </MediaQuery>
      </div>
      { menuOpened ? <div className={classes.divider}/> : undefined }
      <div className={classes.websitesContainer}>
        {Array.from(availableWebsites.values()).filter((website) => website.id !== current).map((website) => (
          <WebsitePane key={website.id} website={website} /> 
        ))}
      </div>
      {/* <Text
        size={'xl'}
        weight={700}
        component={NextLink}
        href={'/'}
        color={router.pathname === '/' ? colorSelected : ''}
      >
        {t('titleCat1')}
      </Text> */}
    </div>
  )
}