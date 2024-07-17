import { getPublicClientWithoutAlchemy } from '@/lib/viem'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from 'viem/ens'

const usePfpImage = (address: Address) => {
  const [pfpImage, setPfpImage] = useState('')

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
      setPfpImage(ensUrl)
    }
    if (!address) return
    init()
  }, [address])

  return {
    pfpImage,
  }
}

export default usePfpImage
