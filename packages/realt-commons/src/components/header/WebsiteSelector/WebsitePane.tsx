import { Text } from "@mantine/core";
import { IconClock, IconExternalLink } from "@tabler/icons";
import React from "react";
import { FC, useState } from "react";
import { openInNewTab } from "../../../utils/window";
import { Website } from "../../../types/website";
import styled from "styled-components";

interface StylesParams{
    $hovered: boolean;
    $comingSoon: boolean;
}

const Container = styled('div')<StylesParams>`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: var(--mantine-spacing-sm);
    border-radius: var(--mantine-spacing-sm);
    padding: 10px;
    background-color: ${({ $hovered }) => ($hovered ? '#cfaa70' : 'transparent')};
    &:hover {
        cursor: ${({ $comingSoon }) => ($comingSoon ? "not-allowed" : "pointer")};
    } 
`;

const WebsiteName = styled('div')<StylesParams & { $title: string }>`
    text-decoration: none;
    flex-grow: 1;
    font-weight: ${({ $hovered })  => ($hovered ? 700 : 300)};
    color: ${({ $hovered }) => ($hovered ? 'black' : 'white')};
    &::after {
        text-decoration: none;
        display: block;
        content: ${({ $title }) => ($title)};
        font-weight: bold;
        height: 1px;
        color: white;
        overflow: hidden;
        visibility: hidden;
    }
`;

export interface WebsitePaneProps{
    website: Website;
}
export const WebsitePane: FC<WebsitePaneProps> = ({ website  }) => {

    const comingSoon = website.comingSoon;
    const [hovered,setHovered] = useState<boolean>(false);

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
        <Container
            $comingSoon={comingSoon}
            $hovered={hovered}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            onClick={() => goTo()}
        >
            {comingSoon ? (
                <div
                    style={{
                        color: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        display: 'flex',
                        gap: 'var(--mantine-spacing-sm)',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        position: "absolute",
                        backgroundColor: "rgb(211,211,211,0.85)"
                    }}
                >
                    <Text>{"Coming soon"}</Text>
                    <IconClock />
                </div>
            ): undefined}
            { website.logo ? React.createElement(website.logo) : undefined }
            <WebsiteName 
                $comingSoon={comingSoon}
                $hovered={hovered}
                $title={website.name}
            >
                {website.name}
            </WebsiteName>
            {/* <Text className={classes.websiteName}>{website.name}</Text> */}
            <IconExternalLink color={hovered ? 'black' : 'white'} />
        </Container>
    )
}