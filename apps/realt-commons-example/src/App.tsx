import { Flex, Text } from "@mantine/core";
import './App.css'
import { useWeb3React } from '@web3-react/core';

function App() {

  const { account, chainId, provider, connector } = useWeb3React();
  console.log(provider)
  console.log(connector)

  return (
    <Flex direction={"column"}>
      <Text>{`account: ${account}`}</Text>
      <Text>{`chainId: ${chainId}`}</Text>
    </Flex>
  )
}

export default App
