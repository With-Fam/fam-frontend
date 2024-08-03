import { Address } from 'viem'

const getUserEnsName = (avatars: any, address: Address) =>
  avatars?.ensNames?.[`${address}`] || avatars?.openSeaNames?.[`${address}`]

export default getUserEnsName
