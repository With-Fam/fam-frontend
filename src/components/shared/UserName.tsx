'use client'
// Third Parties
import { useEnsName } from 'wagmi'

// Types
import { CHAIN_ID } from '@/types'
type UserNameProps = {
  address: `0x${string}`
  className?: string
  blankComponent?: boolean
  addressFallback?: boolean
}

// Components
import { Paragraph } from '@/stories'

// Helpers
import { walletSnippet } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UserName = ({
  address,
  className,
  blankComponent,
  addressFallback,
}: UserNameProps): JSX.Element | string => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: CHAIN_ID.ETHEREUM,
  })

  if (addressFallback) {
    return ensName || walletSnippet(address)
  }

  if (blankComponent) {
    return ensName || ''
  }

  return (
    <Paragraph as="p5" className={className || 'pl-2.5'}>
      {ensName || walletSnippet(address)}
    </Paragraph>
  )
}

export default UserName
