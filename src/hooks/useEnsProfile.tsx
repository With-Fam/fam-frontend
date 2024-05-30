import { useQuery } from '@airstack/airstack-react'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import getIpfsLink from '../utils/getIpfsLink'

const pfpQuery = `query MyQuery($userAddress: Address) {
    Socials(input: {filter: {userAssociatedAddresses: {_eq: $userAddress}}, blockchain: ethereum}) {
      Social {
        profileName
        profileImage
        userAddress
      }
    }
  }`

const useEnsProfile = (address: Address) => {
  const [pfpImage, setPfpImage] = useState('')
  const [profileName, setProfileName] = useState('')
  const { data, error } = useQuery(
    pfpQuery,
    { userAddress: address },
    { cache: true }
  )

  useEffect(() => {
    const init = () => {
      const socalPfps = data.Socials.Social.filter(
        (item: any) => item?.profileImage
      )
      if (!socalPfps?.length) return
      setPfpImage(getIpfsLink(socalPfps[0]?.profileImage))
      const socalNames = data.Socials.Social.filter(
        (item: any) => item?.profileName
      )
      if (!socalNames?.length) return
      setProfileName(socalNames[0]?.profileName)
    }
    if (!data?.Socials?.Social) return
    init()
  }, [data])

  return {
    pfpImage,
    profileName,
  }
}

export default useEnsProfile
