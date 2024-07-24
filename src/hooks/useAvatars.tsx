import { useEffect, useState } from 'react'

const useAvatars = (members: any) => {
  const [avatars, setAvatars] = useState(null)

  useEffect(() => {
    const init = async () => {
      const addresses = members.map((member: any) => member.userAddress)
      const response = await fetch(
        `/api/party/avatars?addresses=${JSON.stringify(addresses)}`
      )
      const data = await response.json()
      setAvatars(data)
    }

    if (!members || !members?.length) return
    init()
  }, [members])

  return {
    avatars,
  }
}

export default useAvatars
