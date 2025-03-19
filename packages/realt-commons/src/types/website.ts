import { FC } from "react";
import { Logo } from "../assets";

export enum Websites {
  REALT,
  COMMUNITY_DASHBOARD,
  VOTE,
  YAM,
  BRIDGE,
  RMM,
  EXAMPLE,
}

export interface Website {
  id?: Websites;
  name: string;
  url: string;
  comingSoon: boolean;
  logo: FC<any> | undefined;
}

export const availableWebsites: Map<Websites, Website> = new Map([
  [
    Websites.REALT,
    {
      id: Websites.REALT,
      name: "RealT website",
      comingSoon: false,
      url: "https://realt.co/",
      logo: Logo,
    },
  ],
  [
    Websites.YAM,
    {
      id: Websites.YAM,
      name: "YAM",
      comingSoon: false,
      url: "https://yam.realtoken.network/",
      logo: Logo,
    },
  ],
  [
    Websites.RMM,
    {
      id: Websites.RMM,
      name: "RMM",
      comingSoon: false,
      url: "https://rmm.realtoken.network",
      logo: Logo,
    },
  ],
  [
    Websites.VOTE,
    {
      id: Websites.VOTE,
      name: "Vote dashboard",
      comingSoon: false,
      url: "https://vote.realtoken.network",
      logo: Logo,
    },
  ],
  [
    Websites.COMMUNITY_DASHBOARD,
    {
      id: Websites.COMMUNITY_DASHBOARD,
      name: "Community Dashboard",
      comingSoon: false,
      url: "https://dashboard.realtoken.community/",
      logo: Logo,
    },
  ],
  [
    Websites.BRIDGE,
    {
      id: Websites.BRIDGE,
      name: "Bridge",
      comingSoon: true,
      url: "",
      logo: Logo,
    },
  ],
]);
