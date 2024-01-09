'use client'

import { useConnect, useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi'
import { walletSnippet } from '@/utils/helpers'
import { CHAIN_ID } from '@/types'

type UseEnsDataResponse = {
  ensName: string | null | undefined
  ensNameLoading: boolean
  ensAvatar: string | null | undefined
  ethAddress: `0x${string}` | null | undefined
  displayName: string
}

export const useEnsData = (address?: string): UseEnsDataResponse => {
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: address as `0x${string}`,
    chainId: CHAIN_ID.ETHEREUM,
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: CHAIN_ID.ETHEREUM,
  })

  const { data: ensAddress } = useEnsAddress({
    name: address,
    chainId: CHAIN_ID.ETHEREUM,
  })

  return {
    ensName,
    ensNameLoading,
    ensAvatar,
    ethAddress: ensAddress,
    displayName: ensName || walletSnippet(address),
  }
}
