// Framework
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'

// Types
type UserCommunityProps = {
  community: TokenFragment
  network: string
}

// Utils
import { formatDateFromUnixTimestamp } from '@/components/profile/helpers'
import { TokenFragment } from '@/data/subgraph/sdk.generated'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const UserCommunity = ({
  community,
  network,
}: UserCommunityProps): JSX.Element => {
  const { tokenContract, image, name, mintedAt } = community
  const [srcError, setSrcError] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <Link href={`/community/${network}/${tokenContract}`} passHref>
      <div className="rounded-2xl bg-white p-3">
        {image && (
          <div className="relative z-0 h-80 w-80 rounded-lg object-cover">
            {!srcError && (
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="rounded-lg object-cover"
                onLoad={() => {
                  setLoading(false)
                }}
                onErrorCapture={() => {
                  setSrcError(true)
                }}
                onError={() => {
                  setSrcError(true)
                }}
              />
            )}
            {srcError ||
              (loading && (
                <div
                  className={twMerge(
                    'h-full w-full rounded-lg bg-grey-light',
                    loading ? 'animate-pulse' : ''
                  )}
                />
              ))}
          </div>
        )}
        <Paragraph as="p3" className="pb-2 pt-3">
          {name}
        </Paragraph>
        <div className="flex justify-between">
          <Paragraph as="p4" className="text-grey">
            Joined {formatDateFromUnixTimestamp(mintedAt)}
          </Paragraph>
        </div>
      </div>
    </Link>
  )
}

export default UserCommunity
