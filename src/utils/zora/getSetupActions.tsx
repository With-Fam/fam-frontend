import { Interface } from 'ethers'
import dropAbi from '@/utils/abi/abi-ERC1155Drop.json'
import { SALE_STRATEGY } from '@/constants/addresses'
import { CHAIN_ID } from '@/constants/defaultChains'
import getCallSaleData from '@/utils/zora/getCallSaleData'
import { Address } from 'viem'

const getSetupActions = (
  adminWallet: Address,
  ifpsUri: string,
  pricePerToken: bigint,
  totalSupply: string,
  payoutAddress: Address
) => {
  const dummyNextTokenId = 1
  const dummySaleStart = 0

  const adminPermissionArgs = [0, adminWallet, 2]
  const minterPermissionArgs = [0, SALE_STRATEGY[CHAIN_ID], 2]
  const minterPermissionArgs2 = [dummyNextTokenId, SALE_STRATEGY[CHAIN_ID], 2]
  const iface = new Interface(dropAbi)
  const minterPermissionCall = iface.encodeFunctionData(
    'addPermission',
    minterPermissionArgs
  )
  const minterPermissionCall2 = iface.encodeFunctionData(
    'addPermission',
    minterPermissionArgs2
  )
  const adminPermissionCall = iface.encodeFunctionData(
    'addPermission',
    adminPermissionArgs
  )
  const openEdition = 0
  const maxUint64 = '18446744073709551615'
  const data = getCallSaleData({
    tokenId: dummyNextTokenId,
    saleStart: dummySaleStart,
    saleEnd: maxUint64,
    maxTokensPerAddress: openEdition,
    pricePerToken,
    fundsRecipient: adminWallet,
    erc20Address: payoutAddress,
  })
  const callSaleArgs = [dummyNextTokenId, SALE_STRATEGY[CHAIN_ID], data]
  const setupNewTokenArgs = [ifpsUri, totalSupply]
  const setupNewTokenCall = iface.encodeFunctionData(
    'setupNewToken',
    setupNewTokenArgs
  )
  const callSaleCall = iface.encodeFunctionData('callSale', callSaleArgs)
  const setupActions = [
    adminPermissionCall,
    minterPermissionCall,
    minterPermissionCall2,
    setupNewTokenCall,
    callSaleCall,
  ]
  return setupActions
}

export default getSetupActions
