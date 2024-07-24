'use client'

import { useEffect, useState } from 'react'
import useConnectedWallet from '@/hooks/useConnectedWallet'
import get721Metadata from '@/lib/zora/get721Metadata'
import get721NFTName from '@/lib/zora/get721NFTName'

const useCommunity = (community: any): any => {
  const [data, setData] = useState(null)
  const [name, setName] = useState('')
  const { connectedWallet } = useConnectedWallet()

  useEffect(() => {
    const init = async () => {
      const data = await get721Metadata(community)
      setData(data)
      const response = await get721NFTName(community)
      setName(response as string)
    }

    if (!community || !connectedWallet) return
    init()
  }, [community, connectedWallet])

  return {
    data,
    name,
  }
}

export default useCommunity
