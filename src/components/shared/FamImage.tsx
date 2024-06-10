'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

const FamImage = ({ alt, src, ..._props }: ImageProps): JSX.Element => {
  const [srcError, setSrcError] = useState(false)

  if (srcError) {
    return (
      <Image
        alt="Fam default image"
        src="/assets/images/fam-default-card.jpg"
        {..._props}
      />
    )
  }

  return (
    <Image
      alt={alt}
      src={src}
      {..._props}
      onError={() => setSrcError(true)}
      onErrorCapture={() => setSrcError(true)}
    />
  )
}

export default FamImage
