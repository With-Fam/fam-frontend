'use client'
// Framework
import Image, { type ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

// Types
type HandleImageProps = ImageProps & {
  noDefault?: boolean
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function HandleImage({
  alt,
  width,
  height,
  className,
  noDefault = false,
  ...props
}: HandleImageProps): JSX.Element {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      !loaded && setError(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [loaded])

  if (error && !noDefault) {
    return (
      <Image
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...props}
        src="/assets/images/default-blank.jpg"
      />
    )
  }

  if (error && noDefault) {
    return <></>
  }

  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      onLoad={() => {
        setLoaded(true)
      }}
      className={className}
      {...props}
    />
  )
}
