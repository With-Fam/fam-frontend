import getEnsPfpLink from '@/lib/getEnsPfpLink'
import { Address } from 'viem'

const getUserAvatar = (avatars: any, address: Address) => {
  return (
    getEnsPfpLink(avatars?.ensNames?.[`${address}`]) ||
    avatars?.openSeaProfileImages?.[`${address}`]
  )
}

export default getUserAvatar
