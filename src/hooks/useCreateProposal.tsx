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
import { Address, encodeAbiParameters, isAddress, maxUint256, parseAbiParameters, parseEther } from 'viem'
import getEnsAddress from '@/lib/getEnsAddress'
import handleTxError from '@/lib/handleTxError'
import getCollectionInfoFromZoraLink from '@/lib/getCollectionInfoFromZoraLink'
import getToken from '@/lib/zora/getToken'
import getCollectorClient from '@/lib/zora/getCollectorClient'
import getSaleConfig from '@/lib/zora/getSaleConfig'
import FAM from '@/constants/fam'
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments'
import { SALE_STRATEGY } from '@/constants/addresses'

const useCreateProposal: any = (community: Address) => {
  const { walletClient } = usePrivyWalletClient(CHAIN)
  const { limitPerAddress, editionSize } = useProposalStore()
  const { logout } = usePrivy()

  const create = async (transaction: any) => {
    const {
      target,
      value,
      ipfsImage,
      ipfsMedia,
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
        const collectionInfo = getCollectionInfoFromZoraLink(value)
        if (
          !isAddress(collectionInfo.collectionAddress) ||
          !collectionInfo.tokenId
        )
          return false

        const { token } = await getToken(
          collectionInfo.collectionAddress,
          '1155',
          collectionInfo.tokenId
        ) as any

        let salesConfig = token?.salesConfig

        if (!salesConfig) salesConfig = await getSaleConfig(collectionInfo.collectionAddress, collectionInfo.tokenId)
        
        const collectorClient = getCollectorClient()

        if (!salesConfig) {
          const { parameters } = await collectorClient.mint({
            tokenContract: collectionInfo.collectionAddress,
            mintType: '1155',
            quantityToMint: 1,
            minterAccount: target,
            tokenId: collectionInfo.tokenId,
          })
  
          const { abi, functionName, args, value, address: minterAddress } = parameters
          args[5] = `Collected by ${token.contract.name} on Fam`
          args[4] = FAM
          
          proposalData = await getZoraCollectProposalData(
            abi,
            args,
            functionName,
            value,
            minterAddress
          )
        } else {
          const zoraFee = parseEther('0.000777')
          const value = salesConfig.pricePerToken + zoraFee
          const minterArguments = encodeAbiParameters(
            parseAbiParameters('address x, string y'),
            [target, `Collected by ${token.contract.name} on Fam`]
          )
        
          const args = [SALE_STRATEGY[CHAIN.id], collectionInfo.tokenId, 1, minterArguments, FAM]
          proposalData = await getZoraCollectProposalData(
            zoraCreator1155ImplABI,
            args,
            "mintWithRewards",
            value,
            SALE_STRATEGY[CHAIN.id]
          )
        }
      }

      if (
        type === TransactionType.ZORA_CREATE &&
        title &&
        ipfsMedia &&
        typeof customEditionSize !== 'undefined' &&
        typeof customLimit !== 'undefined' &&
        typeof duration !== 'undefined' &&
        payoutAddress
      ) {
        let sizeEdition: bigint | number = maxUint256
        if (editionSize === EDITON_SIZE.ONEOFONE) sizeEdition = 1
        if (editionSize === EDITON_SIZE.FIXED) sizeEdition = customEditionSize

        let sizeLimit: number = 0
        if (limitPerAddress === LIMIT.CUSTOM) sizeLimit = customLimit

        const payoutEnsAddress = await getEnsAddress(payoutAddress)

        proposalData = await getZoraCreateProposalData(
          target,
          title,
          description,
          ipfsImage,
          ipfsMedia,
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
