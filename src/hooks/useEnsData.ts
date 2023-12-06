import { useEnsAvatar, useEnsName } from 'wagmi'
import { walletSnippet } from '@/utils/helpers'

export const useEnsData = (address?: string) => {
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: address as `0x${string}`,
    chainId: 5,
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: 5,
  })

  return {
    ensName,
    ensNameLoading,
    ensAvatar,
    displayName: ensName || walletSnippet(address),
  }
}
