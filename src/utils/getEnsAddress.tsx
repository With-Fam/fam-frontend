import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'

const getEnsAddress = async (ensName: string) => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(ensName),
  })
  return ensAddress
}

export default getEnsAddress
