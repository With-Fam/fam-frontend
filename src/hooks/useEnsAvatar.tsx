import { getPublicClientWithoutAlchemy } from '@/lib/viem'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'

const useEnsAvatar = (address: Address) => {
  const [ensAvatar, setEnsAvatar] = useState('')

  useEffect(() => {
    const init = async () => {
      const publicClient = getPublicClientWithoutAlchemy(mainnet.id)
      const ensName = await publicClient.getEnsName({
        address,
      })
      if (!ensName) return
      const ensUrl = await publicClient.getEnsAvatar({
        name: normalize(ensName),
      })
      if (!ensUrl) return
      setEnsAvatar(ensUrl)
    }
    if (!address) return
    init()
  }, [address])

  return {
    ensAvatar,
  }
}

export default useEnsAvatar
