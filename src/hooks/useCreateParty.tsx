import {
  ATOMIC_MANUAL_PARTY,
  PARTY_FACTORY,
  PARTY_IMPLEMENTATION,
} from '@/constants/addresses'
import { atomicManualPartyAbi } from '@/data/contract/abis/AtomicManualParty'
import { partyFactoryAbi } from '@/data/contract/abis/PartyFactory'
import { useFormStore } from '@/modules/create-community'
import { AddressType } from '@/types'
import { ZeroAddress } from 'ethers'
import { useAccount } from 'wagmi'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import { baseSepolia } from 'wagmi/chains'

const useCreateParty = () => {
  const chainId = baseSepolia.id
  const { auctionSettings } = useFormStore()
  const { address } = useAccount()

  const createParty = async () => {
    let transaction

    const totalVotingPower = 100000000000000000000n
    const passThreshold =
      ((auctionSettings.proposalThreshold / 100) * Number(totalVotingPower)) /
      1e18
    const BPS_MULTIPLIER = 100
    const passThresholdBps = passThreshold * BPS_MULTIPLIER

    try {
      const ONE_HOUR = 60 * 60
      const MINIMUM_VOTE_DURATION = ONE_HOUR
      const partyMemberVotingPowers = [1000000n]
      const partyMembers = [address as AddressType]
      const config = await prepareWriteContract({
        address: ATOMIC_MANUAL_PARTY[chainId],
        chainId: chainId,
        abi: atomicManualPartyAbi,
        functionName: 'createParty',
        args: [
          PARTY_IMPLEMENTATION[chainId],
          {
            governance: {
              hosts: [address as AddressType],
              voteDuration: MINIMUM_VOTE_DURATION,
              executionDelay: auctionSettings.executionDelay * ONE_HOUR,
              passThresholdBps,
              totalVotingPower,
              feeBps: 0,
              feeRecipient: ZeroAddress as AddressType,
            },
            proposalEngine: {
              enableAddAuthorityProposal: true,
              allowArbCallsToSpendPartyEth: true,
              allowOperators: true,
              distributionsConfig: 1,
            },
            name: 'PARTY',
            symbol: 'FAM',
            customizationPresetId: 0n,
          },
          [],
          [],
          1715603725,
          partyMembers,
          partyMemberVotingPowers,
          partyMembers,
        ],
      })

      const tx = await writeContract(config)
      if (tx.hash) transaction = await waitForTransaction({ hash: tx.hash })
      return transaction
    } catch (error) {
      return { error }
    }
  }

  return { createParty }
}

export default useCreateParty
