import { createStyles, Flex, MantineTheme, Text } from "@mantine/core";
import { IconClock, IconExternalLink } from "@tabler/icons";
import React from "react";
import { FC, useState } from "react";
import { openInNewTab } from "../../../utils/window";
import { Website } from "./website";

interface StylesParams{
    hovered: boolean;
    comingSoon: boolean;
  }
const useStyles = createStyles((theme: MantineTheme, { hovered, comingSoon }: StylesParams) => ({
    container: {
    position: 'relative',
    overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.sm,
      borderRadius: theme.spacing.sm,
      padding: '10px',
      backgroundColor: hovered ? '#cfaa70' : 'transparent',
      '&:hover': {
        cursor: comingSoon ? "not-allowed" : "pointer"
      } 
    },
    websiteName: {
        textDecoration: 'none',
        flexGrow: 1,
        fontWeight: hovered ? 700 : 300,
        color: hovered ? 'black' : 'white',
        '&::after': {
            textDecoration: 'none',
            display: 'block',
            content: 'attr(title)',
            fontWeight: 'bold',
            height: '1px',
            color: 'white',
            overflow: 'hidden',
            visibility: 'hidden'
        }
    },
    comingSoon: {
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        display: 'flex',
        gap: theme.spacing.sm,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: "absolute",
        backgroundColor: "rgb(211,211,211,0.85)"
    }
}));

export interface WebsitePaneProps{
    website: Website;
}
export const WebsitePane: FC<WebsitePaneProps> = ({ website  }) => {

    const comingSoon = website.comingSoon;
    const [hovered,setHovered] = useState<boolean>(false);
    const { classes } = useStyles({ hovered: hovered, comingSoon: comingSoon });

    const Logo = website.logo;

    const goTo = () => {
        if(website.comingSoon) return;
        openInNewTab(website.url);
    }

    const setH = (state: boolean) => {
        if(comingSoon) return;
        setHovered(state)
    }

    return(
        <Flex
            className={classes.container}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            onClick={() => goTo()}
        >
            {comingSoon ? (
                <div className={classes.comingSoon}>
                    <Text>{"Coming soon"}</Text>
                    <IconClock />
                </div>
            ): undefined}
            { website.logo ? React.createElement(website.logo) : undefined }
            <div className={classes.websiteName} title={website.name}>
                {website.name}
            </div>
            {/* <Text className={classes.websiteName}>{website.name}</Text> */}
            <IconExternalLink color={hovered ? 'black' : 'white'} />
        </Flex>
    )
}