import { Group } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { ChainSelectConfig, Chain } from "../../../types";
import { WalletMenu, SettingsMenu } from "../../menus";
import { NetworkMenu } from "../../menus/NetworkMenu";
import { ConnectButton } from "./ConnectButton";

export interface HeaderButtonsProps<T> {
    chains?: ChainSelectConfig<T>
}
export function HeaderButtons<T extends Partial<Chain>>({ chains }: HeaderButtonsProps<T>) {
    const { account } = useWeb3React();
  
    return (
      <Group spacing={10}>
        <NetworkMenu chains={chains} />
        {account ? <WalletMenu /> : <ConnectButton />}
        <SettingsMenu />
      </Group>
    );
};