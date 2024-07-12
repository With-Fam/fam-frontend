import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { useQuery } from '@airstack/airstack-react'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const pfpQuery = `query MyQuery($userAddress: Address) {
    Socials(input: {filter: {userAssociatedAddresses: {_eq: $userAddress}}, blockchain: ethereum}) {
      Social {
        dappName
        profileName
        profileImage
        userAddress
      }
    }
  }`

const usePfpImage = (address: Address) => {
  const [pfpImage, setPfpImage] = useState('')
  const { data } = useQuery(pfpQuery, { userAddress: address }, { cache: true })

  useEffect(() => {
    const init = () => {
      const pfpLinks = data.Socials.Social.filter(
        (item: any) => item?.profileImage
      )
      if (!pfpLinks?.length) return
      setPfpImage(getPartyDaoIpfsLink(pfpLinks[0]?.profileImage))
    }
    if (!data?.Socials?.Social) return
    init()
  }, [data])

  return {
    pfpImage,
  }
}

export default usePfpImage
