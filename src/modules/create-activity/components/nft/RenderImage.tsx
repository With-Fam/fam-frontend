/* eslint-disable @next/next/no-img-element */
'use client'

// Framework
import { useState } from 'react'

type CreateNFTFormProps = {
  image: string | undefined
}

const RenderImage = ({ image }: CreateNFTFormProps): JSX.Element => {
  const [error, setError] = useState(false)

  if (!image || error) {
    return <></>
  }

  return (
    <img
      src={image}
      alt=""
      onError={() => setError(true)}
      className="h-28 w-auto object-cover"
    />
  )
}

export default RenderImage
