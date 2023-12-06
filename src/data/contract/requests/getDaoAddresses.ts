// import { ZeroAddress } from 'ethers'
import { readContract } from 'wagmi/actions'

import { PUBLIC_MANAGER_ADDRESS } from '@/constants/addresses'
import { AddressType, CHAIN_ID, Maybe } from '@/types'
import { unpackOptionalArray } from '@/utils/helpers'

import { managerAbi } from '../abis'

type DAOAddressesResult = {
  token: AddressType
  auction?: AddressType
  governor?: AddressType
  metadata?: AddressType
  treasury?: AddressType
}

const getDaoAddresses = async (
  chainId: CHAIN_ID,
  tokenAddress: AddressType
): Promise<Maybe<DAOAddressesResult>> => {
  const addresses = await readContract({
    abi: managerAbi,
    address: PUBLIC_MANAGER_ADDRESS[chainId],
    functionName: 'getAddresses',
    args: [tokenAddress],
    chainId,
  })

  const [metadata, auction, treasury, governor] = unpackOptionalArray(
    addresses,
    4
  )

  // fix to handle missing addresses

  //   const hasMissingAddresses = Object.values(addresses).includes(
  //     ethers.constants.AddressZero
  //   )

  //   if (hasMissingAddresses) return null

  return {
    token: tokenAddress,
    auction,
    governor,
    metadata,
    treasury,
  }
}

export default getDaoAddresses
