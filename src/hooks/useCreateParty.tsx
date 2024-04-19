import { PARTY_FACTORY, PARTY_IMPLEMENTATION } from '@/constants/addresses'
import { partyFactoryAbi } from '@/data/contract/abis/PartyFactory'
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'
import { baseSepolia } from 'wagmi/chains'

const useCreateParty = () => {
  const chainId = baseSepolia.id

  const createParty = async () => {
    let transaction
    let response

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
              executionDelay: 86400,
              passThresholdBps: 5000,
              totalVotingPower: 100000000000000000000n,
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
        response = { success: true, transaction }
      }
    } catch (error) {
      response = { success: false, error }
    }

    return response
  }

  return { createParty }
}

export default useCreateParty
