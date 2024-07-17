'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { gradientForAddress } from '@/components/shared/gradient'
import { twMerge } from 'tailwind-merge'
import usePfpImage from '@/hooks/usePfpImage'
import { Address } from 'viem'

type UserAvatarProps = {
  address: string
  width: number
  height: number
  className?: string
}

const UserAvatar = ({
  address,
  width,
  height,
  className,
}: UserAvatarProps): JSX.Element => {
  const { pfpImage } = usePfpImage(address as Address)

  const [imageError, setImageError] = useState(false)

  const background = useMemo(() => {
    if (address && !pfpImage) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else if (pfpImage) {
      return `#FFFFFF`
    } else {
      return 'transparent'
    }
  }, [address, pfpImage])

  return (
    <>
      {pfpImage && !imageError ? (
        <Image
          src={pfpImage}
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
