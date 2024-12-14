import {
  ATOMIC_MANUAL_PARTY,
  HYPERSUB_FACTORY,
  MULTICALL,
} from '@/constants/addresses'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import { getPublicClient } from '@/lib/viem'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { Address, parseEventLogs } from 'viem'
import { multicall3Abi } from '@/lib/abi/multicall3Abi'
import { getPartyCallData } from '@/lib/party/getPartyCallData'
import { getDeployHypersubCallData } from '@/lib/hypersub/getDeployHypersubCallData'
import { hypersubFactoryAbi } from '@/lib/abi/hypersubFactoryAbi'
import { atomicManualPartyAbi } from '@/lib/abi/atomicManualPartyAbi'

export interface DeploymentResult {
  partyAddress?: Address
  hypersubAddress?: Address
  error?: unknown
}

interface CreatePartyManualResult {
  createPartyAndHypersub: () => Promise<DeploymentResult>
}

const useCreatePartyManual = (): CreatePartyManualResult => {
  const { membership, vetoPeriod } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createPartyAndHypersub = async (): Promise<DeploymentResult> => {
    if (!walletClient) return { error: 'Wallet client not found' }

    try {
      const publicClient = getPublicClient(CHAIN_ID)

      const partyMembers = [address] as Address[]

      const partyCallData = await getPartyCallData({
        membership,
        vetoPeriod,
        partyMembers,
      })

      const hypersubCallData = getDeployHypersubCallData()

      const calls = [
        {
          target: ATOMIC_MANUAL_PARTY[CHAIN_ID],
          callData: partyCallData,
          allowFailure: false,
        },
        {
          target: HYPERSUB_FACTORY[CHAIN_ID],
          callData: hypersubCallData,
          allowFailure: false,
        },
      ]

      console.log('calls', calls)
      const txHash = await walletClient.writeContract({
        address: MULTICALL,
        abi: multicall3Abi,
        functionName: 'aggregate3',
        args: [calls],
        chain: CHAIN,
        account: address as Address,
      })

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })

      const partyLogs = parseEventLogs({
        logs: receipt.logs,
        abi: atomicManualPartyAbi,
        eventName: 'AtomicManualPartyCreated',
      })

      const hypersubLogs = parseEventLogs({
        logs: receipt.logs,
        abi: hypersubFactoryAbi,
        eventName: 'Deployment',
      })

      const partyEvent = partyLogs[0]
      const hypersubEvent = hypersubLogs[0]

      return {
        partyAddress: partyEvent?.args?.party as Address | undefined,
        hypersubAddress: hypersubEvent?.args?.deployment as Address | undefined,
      }
    } catch (error) {
      console.error('error', error)
      return { error }
    }
  }

  return { createPartyAndHypersub }
}

export default useCreatePartyManual
