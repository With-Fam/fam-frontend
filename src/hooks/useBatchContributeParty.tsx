import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import { getPublicClient } from '@/lib/viem'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Address } from 'viem'
import toast from 'react-hot-toast'
import { SELL_PARTY_CARD_AUTHORITY } from '@/constants/addresses'
import { sellPartyCartAuthorityAbi } from '@/data/contract/abis/SellPartCards'

const useBatchContributeParty = () => {
  const { community } = useParams()
  const { walletClient } = usePrivyWalletClient()
  const { connectedWallet } = useConnectedWallet()
  const publicClient = getPublicClient(CHAIN_ID)
  const [loading, setLoading] = useState(false)

  const batchContribute = async (membershipSale: any) => {
    if (!walletClient || !connectedWallet) return

    const membershipPrice = BigInt(membershipSale.pricePerMembership)
    const saleId = membershipSale.saleId
    setLoading(true)
    try {
      await walletClient.switchChain({ id: CHAIN_ID })

      const sellPartyCardAuthority = SELL_PARTY_CARD_AUTHORITY[CHAIN_ID]

      const contractConfig = {
        account: walletClient.account,
        abi: sellPartyCartAuthorityAbi,
        functionName: 'batchContribute',
        address: sellPartyCardAuthority as Address,
        chain: CHAIN,
        args: [
          community,
          saleId,
          connectedWallet,
          [membershipSale.pricePerMembership],
          '0x',
        ],
        value: membershipPrice,
      }
      const { request } = await publicClient.simulateContract(
        contractConfig as any
      )
      const txHash = await walletClient.writeContract(request as any)
      let transaction
      if (txHash) {
        transaction = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        })
      }
      setLoading(false)
      toast.success('joined!')
      return transaction
    } catch (error) {
      setLoading(false)
      return { error }
    }
  }

  return {
    batchContribute,
    loading,
  }
}

export default useBatchContributeParty
