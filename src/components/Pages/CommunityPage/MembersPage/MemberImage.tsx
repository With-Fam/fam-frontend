'use client'

import Image from 'next/image'
import { useState } from 'react'
import useZoraPfp from '@/hooks/useZoraPfp'

type MemberImageProps = {
  address: string
  className?: string
  ensImage: string
}

const MemberImage = ({
  address,
  className,
  ensImage,
}: MemberImageProps): JSX.Element => {
  const [imageError, setImageError] = useState(false)
  const { zoraPfp } = useZoraPfp(address, ensImage)

  return (
    <>
      {ensImage && !imageError ? (
        <div className="relative h-8 w-8 overflow-hidden rounded-full">
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
          style={{ background: zoraPfp, width: 32, height: 32 }}
          className={`rounded-full ${className}`}
        />
      )}
    </>
  )
}

export default MemberImage
