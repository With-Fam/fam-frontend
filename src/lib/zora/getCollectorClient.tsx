import { CHAIN_ID } from '@/constants/defaultChains'
import { getPublicClientWithoutAlchemy } from '@/lib/viem'
import { createCollectorClient } from '@zoralabs/protocol-sdk'

const getCollectorClient = () => {
  const publicClient = getPublicClientWithoutAlchemy(CHAIN_ID)
  const collectorClient = createCollectorClient({
    chainId: CHAIN_ID,
    publicClient,
  })

  return collectorClient
}

export default getCollectorClient
