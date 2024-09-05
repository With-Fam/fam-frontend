import { SALE_STRATEGY } from '@/constants/addresses'
import { CHAIN } from '@/constants/defaultChains'
import FAM from '@/constants/fam'
import getZoraCollectProposalData from '@/lib/party/getZoraCollectProposalData'
import getCollectorClient from '@/lib/zora/getCollectorClient'
import getSaleConfig from '@/lib/zora/getSaleConfig'
import getToken from '@/lib/zora/getToken'
import { zoraCreator1155ImplABI } from '@zoralabs/protocol-deployments'
import { encodeAbiParameters, parseAbiParameters, parseEther } from 'viem'

const getZoraCollectProposal = async (
  collectionAddress: any,
  tokenId: any,
  target: any
) => {
  const { token } = (await getToken(collectionAddress, '1155', tokenId)) as any
  let salesConfig = token?.salesConfig

  if (salesConfig) {
    const collectorClient = getCollectorClient()
    const { parameters } = await collectorClient.mint({
      tokenContract: collectionAddress,
      mintType: '1155',
      quantityToMint: 1,
      minterAccount: target,
      tokenId: tokenId,
    })

    const {
      abi,
      functionName,
      args,
      value,
      address: minterAddress,
    } = parameters
    args[5] = `Collected by ${token.contract.name} on Fam`
    args[4] = FAM

    const proposalData = await getZoraCollectProposalData(
      abi,
      args,
      functionName,
      value,
      minterAddress
    )

    return proposalData
  }

  salesConfig = await getSaleConfig(collectionAddress, tokenId)
  const zoraFee = parseEther('0.000777')
  const value = salesConfig.pricePerToken + zoraFee
  const minterArguments = encodeAbiParameters(
    parseAbiParameters('address x, string y'),
    [target, `Collected by ${token.contract.name} on Fam`]
  )

  const args = [SALE_STRATEGY[CHAIN.id], tokenId, 1, [FAM], minterArguments]
  const proposalData = await getZoraCollectProposalData(
    zoraCreator1155ImplABI,
    args,
    'mint',
    value,
    collectionAddress
  )

  return proposalData
}

export default getZoraCollectProposal
