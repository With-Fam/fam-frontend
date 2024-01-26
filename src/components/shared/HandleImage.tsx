'use client'
// Framework
import Image, { type ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

export function HandleImage({
  alt,
  width,
  height,
  className,
  ...props
}: ImageProps): JSX.Element {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      !loaded && setError(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [loaded])

  if (error) {
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

  return (
    <Image
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      onLoadingComplete={() => {
        console.log('loaded')
        setLoaded(true)
      }}
      className={className}
      {...props}
    />
  )
}
