'use client'

import Image from 'next/image'
import { useState } from 'react'
import useZoraPfp from '@/hooks/useZoraPfp'

type UserImageProps = {
  address: string
  className?: string
  ensImage: string
  width?: number
  height?: number
}

const UserImage = ({
  address,
  className,
  ensImage,
  width = 80,
  height = 80,
}: UserImageProps): JSX.Element => {
  const [imageError, setImageError] = useState(false)
  const { zoraPfp } = useZoraPfp(address, ensImage)

  return (
    <>
      {ensImage && !imageError ? (
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width,
            height,
          }}
        >
          <Image
            src={ensImage}
            alt=""
            onError={() => setImageError(true)}
            onErrorCapture={() => setImageError(true)}
            layout="fill"
            className="absolute left-0 top-0 size-full rounded-lg"
          />
        </div>
      ) : (
        <div
          style={{ background: zoraPfp, width, height }}
          className={`rounded-full ${className}`}
        />
      )}
    </>
  )
}

export default UserImage
