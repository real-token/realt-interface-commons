import { Group } from "@mantine/core";
import { useWeb3React } from "@web3-react/core";
import { WalletMenu, SettingsMenu } from "../../menus";
import { NetworkMenu } from "../../menus/NetworkMenu";
import { ConnectButton } from "./ConnectButton";

export function HeaderButtons() {
    const { account } = useWeb3React();
  
    return (
      <Group gap={10}>
        <NetworkMenu />
        {account ? <WalletMenu /> : <ConnectButton />}
        <SettingsMenu />
      </Group>
    );
};