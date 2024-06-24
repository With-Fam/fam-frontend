import { Interface } from 'ethers'
import dropAbi from '@/lib/abi/abi-ERC1155Drop.json'
import { SALE_STRATEGY } from '@/constants/addresses'
import { CHAIN_ID } from '@/constants/defaultChains'
import getCallSaleData from '@/lib/zora/getCallSaleData'
import { Address } from 'viem'
import getEnsAddress from '@/lib/getEnsAddress'

const getSetupActions = (
  ifpsUri: string,
  pricePerToken: bigint,
  editionSize: bigint | number,
  limitPerAddress: bigint | number,
  duration: number,
  payoutAddress: Address
) => {
  const dummyNextTokenId = 1
  const dummySaleStart = 0

  const minterPermissionArgs2 = [dummyNextTokenId, SALE_STRATEGY[CHAIN_ID], 4]
  const iface = new Interface(dropAbi)
  const minterPermissionCall2 = iface.encodeFunctionData(
    'addPermission',
    minterPermissionArgs2
  )

  const data = getCallSaleData({
    tokenId: dummyNextTokenId,
    saleStart: dummySaleStart,
    saleEnd:
      parseInt(Number(Date.now() / 1000).toFixed(0)) + duration * 60 * 60 * 24,
    maxTokensPerAddress: limitPerAddress,
    pricePerToken,
    fundsRecipient: payoutAddress,
  })
  const callSaleArgs = [dummyNextTokenId, SALE_STRATEGY[CHAIN_ID], data]
  const setupNewTokenArgs = [ifpsUri, editionSize.toString()]
  const setupNewTokenCall = iface.encodeFunctionData(
    'setupNewToken',
    setupNewTokenArgs
  )
  const callSaleCall = iface.encodeFunctionData('callSale', callSaleArgs)
  const setupActions = [minterPermissionCall2, setupNewTokenCall, callSaleCall]
  return setupActions
}

export default getSetupActions
