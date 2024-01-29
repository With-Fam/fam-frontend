'use client'

// Framework
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Local Components
import { Paragraph } from '@/stories'
import ExternalLink from '@/components/icons/ExternalLink'
import InfoMark from '@/components/icons/InfoMark'
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})
const UserAvatar = dynamic(() => import('@/components/shared/UserAvatar'), {
  ssr: false,
})

// Types
type RenderFounderProps = {
  founderAddress: string
  ownershipPct: number
}

// Utils

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RenderFounder = ({
  founderAddress,
  ownershipPct,
}: RenderFounderProps): JSX.Element => (
  <div className="mb-4 flex items-center justify-between">
    <div className="flex items-center justify-start gap-2">
      <UserAvatar
        address={founderAddress}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
      />
      <Paragraph as="p3" className="flex items-center gap-1">
        <UserName address={founderAddress as `0x${string}`} addressFallback />
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

export default RenderFounder
