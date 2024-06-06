import { useEffect, useState } from 'react'
import { Address, createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const useEnsName = (value: string) => {
  const [ensName, setEnsName] = useState('')

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  useEffect(() => {
    const init = async () => {
      const name = await publicClient.getEnsName({
        address: value as Address,
      })
      if (!name) {
        setEnsName('')
        return
      }
      setEnsName(name)
    }

    if (!value) return
    init()
  }, [value])

  return {
    ensName,
  }
}

export default useEnsName
