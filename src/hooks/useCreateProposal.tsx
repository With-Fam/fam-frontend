import { SALE_STRATEGY } from '@/constants/addresses'
import { CHAIN, CHAIN_ID } from '@/constants/defaultChains'
import { partyAbi } from '@/data/contract/abis/Party'
import usePrivyWalletClient from '@/hooks/usePrivyWalletClient'
import {
  EDITON_SIZE,
  LIMIT,
  useProposalStore,
} from '@/modules/create-activity/stores'
import { TransactionType } from '@/modules/create-activity/types'
import getZoraCreateProposalData from '@/lib/party/getZoraCreateProposalData'
import getSendEthProposalData from '@/lib/party/getSendEthProposalData'
import getZoraCollectProposalData from '@/lib/party/getZoraCollectProposalData'
import { getPublicClient } from '@/lib/viem'
import { usePrivy } from '@privy-io/react-auth'
import { Address, maxUint256, parseEther } from 'viem'
import getEnsAddress from '@/lib/getEnsAddress'
import handleTxError from '@/lib/handleTxError'
import getAddressFromZoraLink from '@/lib/getAddressFromZoraLink'

const useCreateProposal: any = (community: Address) => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const { limitPerAddress, editionSize } = useProposalStore()
  const { logout } = usePrivy()

  const create = async (transaction: any) => {
    const {
      target,
      value,
      collectionImage,
      title,
      description,
      pricePerEdition,
      customEditionSize,
      customLimit,
      duration,
      payoutAddress,
      type,
    } = transaction

    try {
      if (!walletClient) {
        await logout()
        return false
      }

      await walletClient.switchChain({ id: CHAIN_ID })

      const latestSnapIndex = 0n
      let proposalData: any = null
      if (type === TransactionType.SEND_ETH)
        proposalData = getSendEthProposalData(target, value)

      if (type === TransactionType.ZORA_COLLECT) {
        const collectionAddress = getAddressFromZoraLink(value)
        proposalData = getZoraCollectProposalData(
          collectionAddress as Address,
          SALE_STRATEGY[CHAIN.id],
          target,
          0,
          1n
        )
      }

      if (
        type === TransactionType.ZORA_CREATE &&
        title &&
        description &&
        collectionImage &&
        typeof customEditionSize !== 'undefined' &&
        typeof customLimit !== 'undefined' &&
        typeof duration !== 'undefined' &&
        payoutAddress
      ) {
        let sizeEdition: bigint | number = maxUint256
        if (editionSize === EDITON_SIZE.ONEOFONE) sizeEdition = 1
        if (editionSize === EDITON_SIZE.FIXED) sizeEdition = customEditionSize

        let sizeLimit: bigint | number = 0
        if (limitPerAddress === LIMIT.CUSTOM) sizeLimit = customLimit

        const payoutEnsAddress = await getEnsAddress(payoutAddress)

        proposalData = await getZoraCreateProposalData(
          target,
          title,
          description,
          collectionImage,
          parseEther(pricePerEdition.toString()),
          sizeEdition,
          sizeLimit,
          duration,
          payoutEnsAddress || payoutAddress
        )
      }

      const args = [proposalData, latestSnapIndex] as any
      const contractConfig = {
        account: walletClient.account,
        abi: partyAbi,
        functionName: 'propose',
        address: community,
        chain: CHAIN,
        args,
      }
      const publicClient = getPublicClient(CHAIN_ID)
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
      return transaction
    } catch (err: any) {
      handleTxError(err)
      return { error: err }
    }
  }

  return { create }
}

export default useCreateProposal
