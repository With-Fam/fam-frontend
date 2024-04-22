import { PARTY_FACTORY, PARTY_IMPLEMENTATION } from '@/constants/addresses'
import { partyFactoryAbi } from '@/data/contract/abis/PartyFactory'
import { useFormStore } from '@/modules/create-community'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import { baseSepolia } from 'wagmi/chains'

const useCreateParty = () => {
  const chainId = baseSepolia.id
  const { auctionSettings } = useFormStore()

  const createParty = async () => {
    let transaction

    const totalVotingPower = 100000000000000000000n
    const passThresholdBps =
      ((auctionSettings.proposalThreshold / 100) * Number(totalVotingPower)) /
      1e18

    try {
      const config = await prepareWriteContract({
        address: PARTY_FACTORY[chainId],
        chainId: chainId,
        abi: partyFactoryAbi,
        functionName: 'createParty',
        args: [
          PARTY_IMPLEMENTATION[chainId],
          ['0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38'],
          {
            governance: {
              hosts: ['0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38'],
              voteDuration: 172800,
              executionDelay: auctionSettings.executionDelay * 60 * 60,
              passThresholdBps: passThresholdBps * 1000,
              totalVotingPower,
              feeBps: 1000,
              feeRecipient: '0x0000000000000000000000000000000000000000',
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
      if (tx.hash) {
        transaction = await waitForTransaction({ hash: tx.hash })
        return transaction
      }
    } catch (error) {
      return { error }
    }
  }

  return { createParty }
}

export default useCreateParty
