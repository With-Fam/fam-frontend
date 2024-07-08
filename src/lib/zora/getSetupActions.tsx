import { Interface } from 'ethers'
import dropAbi from '@/lib/abi/abi-ERC1155Drop.json'
import { SALE_STRATEGY } from '@/constants/addresses'
import { CHAIN_ID } from '@/constants/defaultChains'
import getCallSaleData from '@/lib/zora/getCallSaleData'
import { Address } from 'viem'
import getAdminMintCall from '@/lib/zora/getAdminMintCall'
import FAM from '@/constants/fam'

const getSetupActions = (
  ifpsUri: string,
  pricePerToken: bigint,
  editionSize: bigint | number,
  limitPerAddress: bigint | number,
  duration: number,
  payoutAddress: Address
) => {
  let isFreeMint = true
  if (pricePerToken !== 0n) isFreeMint = false

  const dummyNextTokenId = 1n
  const dummySaleStart = 0

  const minterPermissionArgs2 = [dummyNextTokenId, SALE_STRATEGY[CHAIN_ID], 4]
  const iface = new Interface(dropAbi)
  const minterPermissionCall = iface.encodeFunctionData(
    'addPermission',
    minterPermissionArgs2
  )

  const data = getCallSaleData({
    tokenId: dummyNextTokenId,
    saleStart: dummySaleStart,
    saleEnd: parseInt(Number(Date.now() / 1000).toFixed(0)) + duration,
    maxTokensPerAddress: limitPerAddress,
    pricePerToken,
    fundsRecipient: payoutAddress,
  })
  const callSaleArgs = [dummyNextTokenId, SALE_STRATEGY[CHAIN_ID], data]
  const setupNewTokenArgs = [ifpsUri, editionSize.toString()]
  if (isFreeMint) setupNewTokenArgs.push(FAM)
  const setupNewTokenCall = iface.encodeFunctionData(
    isFreeMint ? 'setupNewTokenWithCreateReferral' : 'setupNewToken',
    setupNewTokenArgs
  )
  const adminMintCall = getAdminMintCall(dummyNextTokenId, payoutAddress)
  const callSaleCall = iface.encodeFunctionData('callSale', callSaleArgs)
  const setupActions = [
    minterPermissionCall,
    setupNewTokenCall,
    callSaleCall,
    adminMintCall,
  ]

  return setupActions
}

export default getSetupActions
