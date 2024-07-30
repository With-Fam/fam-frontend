import getEnsPfpLink from '@/lib/getEnsPfpLink'
import { Address } from 'viem'

const getUserAvatar = (avatars: any, address: Address) =>
  getEnsPfpLink(avatars?.ensNames?.[`${address}`])

export default getUserAvatar
