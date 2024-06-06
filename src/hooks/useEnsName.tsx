import { useEffect, useState } from 'react'
import { Address, createPublicClient, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'

const useEnsName = (value: string): any => {
  const [ensName, setEnsName] = useState('')

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  })

  useEffect(() => {
    const init = async () => {
      try {
        if (!isAddress(value)) {
          setEnsName('')
          return
        }
        const name = await publicClient.getEnsName({
          address: value as Address,
        })
        if (!name) {
          setEnsName('')
          return
        }
        setEnsName(name)
      } catch (error) {
        setEnsName('')
      }
    }

    if (!value) return
    init()
  }, [value])

  return {
    ensName,
  }
}

export default useEnsName
