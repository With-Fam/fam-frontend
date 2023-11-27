'use client'

// Framework
import Image from 'next/image'
import Link from 'next/link'

// Local Components
import { Paragraph } from '@/stories'
import ExternalLink from '@/components/icons/ExternalLink'
import InfoMark from '@/components/icons/InfoMark'

// Types
type RenderFounderProps = {
  founderAddress: string
  ownershipPct: number
}

// Utils
import { useEnsData } from '@/hooks/useEnsData'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RenderFounder = ({
  founderAddress,
  ownershipPct,
}: RenderFounderProps): JSX.Element => {
  const { displayName, ensAvatar } = useEnsData(founderAddress)

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        {ensAvatar && (
          <Image
            src={ensAvatar}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        )}
        <Paragraph as="p3" className="flex items-center gap-1">
          {displayName}
          <Link href="/profile">
            <ExternalLink />
          </Link>
        </Paragraph>
      </div>
      <Paragraph as="p3" className="flex items-center gap-1">
        {ownershipPct}% <InfoMark />
      </Paragraph>
    </div>
  )
}

export default RenderFounder
