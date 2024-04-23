import { RPC_URL } from '@/constants/rpc'
import { AddressType, CHAIN_ID } from '@/types'
import { ethers } from 'ethers'
import useSWRImmutable from 'swr/immutable'

export const useIsContract = ({
  address,
  chainId = CHAIN_ID.ETHEREUM,
}: {
  address?: AddressType
  chainId?: CHAIN_ID
}) => {
  return useSWRImmutable(
    address ? [address, chainId] : undefined,
    async (address) => {
      const provider = new ethers.JsonRpcProvider(RPC_URL[chainId])
      return await provider.getCode(address.toString()).then((x) => x !== '0x')
    }
  )
}
