'use client'

// Types
import { Address } from 'viem'
import { CHAIN_ID } from '@/types'
type SocialMediaItemsProps = {
  metadataAddress: Address
  chainId: CHAIN_ID
}

const SocialMediaItems = ({
  metadataAddress,
  chainId,
}: SocialMediaItemsProps): JSX.Element => {
  return <></>
}

export default SocialMediaItems
