import { useEffect, useState } from 'react'
import { Address } from 'viem'

const useUserAvatar = (address: Address) => {
  const [userAvatar, setUserAvatar] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const addresses = [address]
      const response = await fetch(
        `/api/party/avatars?addresses=${JSON.stringify(address)}`
      )
      const data = await response.json()
      setUserAvatar(data)
    }

    if (!address) return
    init()
  }, [address])

  return {
    userAvatar,
  }
}

export default useUserAvatar
