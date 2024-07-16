'use client'

// Framework
import Image from 'next/image'
import { useMemo, useState } from 'react'

// Third Parties
import { useEnsAvatar, useEnsName } from 'wagmi'

// Types
import { CHAIN_ID } from '@/types'
type UserAvatarProps = {
  address: string
  width: number
  height: number
  className?: string
}

// Helpers
import { gradientForAddress } from '@/components/shared/gradient'
import { twMerge } from 'tailwind-merge'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UserAvatar = ({
  address,
  width,
  height,
  className,
}: UserAvatarProps): JSX.Element => {
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: CHAIN_ID.ETHEREUM,
  })
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: CHAIN_ID.ETHEREUM,
  })
  const [imageError, setImageError] = useState(false)

  const background = useMemo(() => {
    if (address && !ensAvatar) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else if (ensAvatar) {
      return '#FFFFFF'
    } else {
      return 'transparent'
    }
  }, [address, ensAvatar])

  return (
    <>
      {ensAvatar && !imageError ? (
        <Image
          src={ensAvatar}
          alt=""
          width={width}
          height={height}
          className={twMerge('rounded-full', className)}
          onError={() => setImageError(true)}
          onErrorCapture={() => setImageError(true)}
        />
      ) : (
        <div
          style={{ background, width, height }}
          className={twMerge('rounded-full', className)}
        />
      )}
    </>
  )
}

export default UserAvatar