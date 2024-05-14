import { Flex, Text } from "@mantine/core";
import { useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers5/react';
import './App.css'

function App() {

  const { address, chainId } = useWeb3ModalAccount();

  return (
    <Flex direction={"column"}>
      <Text>{`account: ${address}`}</Text>
      <Text>{`chainId: ${chainId}`}</Text>
    </Flex>
  )
}

export default App
