import useConnectedWallet from '@/hooks/useConnectedWallet'
import { useEffect, useState } from 'react'

const useUserAvatar = () => {
  const { connectedWallet } = useConnectedWallet()
  const [userAvatar, setUserAvatar] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const addresses = [connectedWallet]
      const response = await fetch(
        `/api/party/avatars?addresses=${JSON.stringify(addresses)}`
      )
      const data = await response.json()
      setUserAvatar(data)
    }

    if (!connectedWallet) return
    init()
  }, [connectedWallet])

  return {
    userAvatar,
  }
}

export default useUserAvatar
