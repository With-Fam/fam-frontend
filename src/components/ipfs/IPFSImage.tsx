import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { getFetchableUrl } from '@/lib/ipfs-service'

import { Maybe } from '@/types'

type IPFSImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src?: string
}

export function IPFSImage({
  src,
  ..._props
}: IPFSImageProps): Maybe<JSX.Element> {
  const cleanUrl = getFetchableUrl(src) as string
  if (!src || !cleanUrl) return null
  return <img {..._props} src={cleanUrl} />
}
