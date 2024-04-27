import { PARTY_FACTORY, PARTY_IMPLEMENTATION } from '@/constants/addresses'
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
    const passThresholdBps =
      ((auctionSettings.proposalThreshold / 100) * Number(totalVotingPower)) /
      1e18

    try {
      const ONE_HOUR = 60 * 60
      const MINIMUM_VOTE_DURATION = ONE_HOUR
      const config = await prepareWriteContract({
        address: PARTY_FACTORY[chainId],
        chainId: chainId,
        abi: partyFactoryAbi,
        functionName: 'createParty',
        args: [
          PARTY_IMPLEMENTATION[chainId],
          [address as AddressType],
          {
            governance: {
              hosts: [address as AddressType],
              voteDuration: MINIMUM_VOTE_DURATION,
              executionDelay: auctionSettings.executionDelay * ONE_HOUR,
              passThresholdBps: passThresholdBps * 1000,
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
