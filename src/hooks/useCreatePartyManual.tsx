import { Address } from 'viem'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { useFormStore } from '@/modules/create-community'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import { createParty, CreatePartyResult } from '@/lib/party/createParty'

const useCreatePartyManual = () => {
  const { membership, vetoPeriod } = useFormStore()
  const { connectedWallet: address } = useConnectedWallet()
  const { walletClient } = usePrivyWalletClient()

  const createPartyTx = async (): Promise<CreatePartyResult> => {
    if (!walletClient || !address) return { error: 'Wallet client not found' }

    return createParty({
      founders: membership.founders,
      threshold: membership.threshold,
      vetoPeriod,
      ownerAddress: address,
      walletClient,
    })
  }

  return { createParty: createPartyTx }
}

export default useCreatePartyManual
