import { Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import React from "react";
import { useState } from "react";
import { availableWebsites, Website, Websites } from "../../../types/website";
import { WebsitePane } from "./WebsitePane";
import styled from 'styled-components'
import { useColorScheme } from "@mantine/hooks";

interface StyleProps{
  $menuOpened: boolean;
  $isDisabled: boolean;
}

const LogoWithName = styled('div')<StyleProps>`
    min-width: 320px;
    display: flex;
    align-items: center;
    gap: var(--mantine-spacing-sm);
    border-radius: 5px 5px 0 0;
    padding: 10px;
    padding-left: 0px;
    background-color: ${({ $menuOpened, $isDisabled }) => ($menuOpened && !$isDisabled ? 'var(--mantine-color-brand-9)' : 'transparent')};
    &:hover {
      cursor: ${({ $isDisabled }) => (!$isDisabled ? "pointer" : "unset")};
    } 
`;

const WebsiteContainer = styled('div')<StyleProps>`
  border-top: 2px solid ${({ $menuOpened, $isDisabled }) => ($menuOpened && !$isDisabled ? 'black' : 'var(--mantine-color-brand-9)')};
  z-index: 99999999;
  width: 100%;
  position: absolute;
  display: flex;
  margin-top: -1px;
  padding: 10px;
  gap: var(--mantine-spacing-sm);
  border-radius: 0 0 5px 5px;
  visibility: ${({ $menuOpened }) => ($menuOpened ? 'inherit' : 'hidden')};
  flex-direction: column;
  background-color: ${({ $menuOpened, $isDisabled }) => ($menuOpened && !$isDisabled? 'var(--mantine-color-brand-9)' : 'transparent' )};
`;
  
interface WebsiteSelectorProps{
    current?: Websites
    newWebsite?: Website
    isDisabled?: boolean;
}
export const WebsiteSelector = ({ current, newWebsite, isDisabled = false } : WebsiteSelectorProps) => {

  const [menuOpened,setMenuOpened] = useState<boolean>(false);

  const currentWebsite = newWebsite ?? (current ? availableWebsites.get(current) : undefined);

  const colorScheme = useColorScheme();
  const color = menuOpened ? 'black' : colorScheme == "dark" ? "white" : "black"

  if(!currentWebsite) return <></>;

  return(
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => { if(!isDisabled) setMenuOpened(true) }}
      onMouseLeave={() => { if(!isDisabled) setMenuOpened(false) }}
    >
      <LogoWithName
        $isDisabled={isDisabled}
        $menuOpened={menuOpened}
      >
        {!isDisabled ? 
          <IconChevronRight 
            style={{
              transform: menuOpened && !isDisabled ? 'rotate(90deg)' : 'rotate(0)',
              transition: 'all 0.3s ease-in-out'
            }} 
          /> 
          : 
          undefined
        }
        { currentWebsite.logo ? React.createElement(currentWebsite.logo) : undefined }
        <Title 
          order={3} 
          style={{ color }}
        >
          {currentWebsite.name}
        </Title>
      </LogoWithName>
      <WebsiteContainer
        $isDisabled={isDisabled}
        $menuOpened={menuOpened}
      >
        {Array.from(availableWebsites.values()).filter((website) => website.id !== current).map((website) => (
          <WebsitePane key={website.id} website={website} /> 
        ))}
      </WebsiteContainer>
    </div>
  )
}