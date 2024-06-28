import { CROWDFUND_PARTY_FACTORY } from '@/constants/addresses'
import { crowdfundFactoryAbi } from '@/data/contract/abis/CrowdfundFactory'
import { getPublicClient } from '@/lib/viem'
import { ChainId } from '@/types/chain'
import { Address } from 'viem'

const getCreatedPartyEvents = async (address: Address, chainId: ChainId) => {
  const publicClient = getPublicClient(chainId)

  const logs = await publicClient.getContractEvents({
    address: CROWDFUND_PARTY_FACTORY[`${chainId as ChainId}`],
    abi: crowdfundFactoryAbi,
    eventName: 'InitialETHCrowdfundCreated',
    args: {
      creator: address,
    },
    fromBlock: 0n,
    toBlock: 'latest',
  })

  const formattedLogs = logs.map((log: any) => log.args.party)

  return formattedLogs
}

export default getCreatedPartyEvents
