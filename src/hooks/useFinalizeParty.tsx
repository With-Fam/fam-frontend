import { SELL_PARTY_CARD_AUTHORITY } from '@/constants/addresses'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { initialETHCrowdfundAbi } from '@/data/contract/abis/InitialETHCrowdfund'
import { sellPartyCartAuthorityAbi } from '@/data/contract/abis/SellPartCards'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import handleTxError from '@/lib/handleTxError'
import getCrowdfundContract from '@/lib/party/getCrowdfundContract'
import { getPublicClient } from '@/lib/viem'
import { useState } from 'react'
import { Address } from 'viem'

const useFinalizeParty = (community: Address) => {
  const [loading, setLoading] = useState(false)
  const { walletClient } = usePrivyWalletClient()
  const { connectedWallet } = useConnectedWallet()

  const finalizeSale = async (saleId: any) => {
    try {
      if (!walletClient) return
      setLoading(true)
      await walletClient.switchChain({ id: CHAIN_ID })

      const sellPartyCard = SELL_PARTY_CARD_AUTHORITY[CHAIN_ID]
      const publicClient = getPublicClient(CHAIN_ID)

      const txHash = await walletClient.writeContract({
        account: connectedWallet as Address,
        address: sellPartyCard as Address,
        abi: sellPartyCartAuthorityAbi,
        functionName: 'finalize',
        chain: CHAIN,
        args: [community, saleId],
      })

      let transaction
      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      setLoading(false)
      return transaction
    } catch (error) {
      setLoading(false)
      handleTxError(error)
      return { error }
    }
  }

  const finalize = async () => {
    try {
      if (!walletClient) return
      setLoading(true)
      await walletClient.switchChain({ id: CHAIN_ID })
      const crowdfund = await getCrowdfundContract(community)
      const publicClient = getPublicClient(CHAIN_ID)

      const txHash = await walletClient.writeContract({
        account: connectedWallet as Address,
        address: crowdfund as Address,
        abi: initialETHCrowdfundAbi,
        functionName: 'finalize',
        chain: CHAIN,
      })

      let transaction
      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      setLoading(false)
      return transaction
    } catch (error) {
      setLoading(false)
      handleTxError(error)
      return { error }
    }
  }

  return {
    finalize,
    loading,
    finalizeSale,
  }
}

export default useFinalizeParty
