import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClientWithoutAlchemy } from '@/lib/viem'
import { createCreatorClient } from '@zoralabs/protocol-sdk'

const getCreatorClient = () => {
  const publicClient = getPublicClientWithoutAlchemy(CHAIN_ID)
  const collectorClient = createCreatorClient({
    chainId: CHAIN_ID,
    publicClient,
  })

  return collectorClient
}

export default getCreatorClient
