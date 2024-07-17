'use client'

import { useMemo } from 'react'
import { gradientForAddress } from '@/components/shared/gradient'
import { twMerge } from 'tailwind-merge'

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
  const background = useMemo(() => {
    if (address) {
      const gradient = gradientForAddress(address)
      return `radial-gradient(75.29% 75.29% at 64.96% 24.36%, ${gradient[0]} 15.62%, ${gradient[1]} 39.58%, ${gradient[2]} 72.92%, ${gradient[3]} 90.62%, ${gradient[4]} 100%)`
    } else {
      return 'transparent'
    }
  }, [address])

  return (
    <div
      style={{ background, width, height }}
      className={twMerge('rounded-full', className)}
    />
  )
}

export default UserAvatar
