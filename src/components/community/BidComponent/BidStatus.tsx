'use client'

// Framework
import Image from 'next/image'

// Third Parties
import { useEnsData } from '@/hooks/useEnsData'

// Local Components
import { Heading, Paragraph } from '@/stories'
import CountDown from '@/components/community/BidComponent/CountDown'

// Types
import {
  AuctionFragment,
} from '@/data/subgraph/sdk.generated'
type BidStatusProps = {
  page: AuctionFragment
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidStatus = ({ page }: BidStatusProps): JSX.Element => {
  const { displayName, ensAvatar } = useEnsData(page?.highestBid?.bidder)

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <Heading as="h5" className="font-abcWide">
          {page?.dao?.name}
        </Heading>
        <Paragraph as="p4" className="rounded-3xl bg-grey-light px-3 py-2">
          #{page?.token?.tokenId}
        </Paragraph>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <Paragraph as="p4" className="text-grey">
          Current Bid
        </Paragraph>
        <Paragraph as="p4" className="text-grey">
          Ends in
        </Paragraph>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <Paragraph as="p2">
          {Number(page?.highestBid?.amount) / 1e18} ETH
        </Paragraph>
        <CountDown page={page} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {ensAvatar && (
            <Image
              src={ensAvatar}
              width={24}
              height={24}
              alt=""
              className="rounded-full object-cover"
            />
          )}
          <Paragraph as="p5" className="pl-2.5">
            {displayName}
          </Paragraph>
        </div>
        <Paragraph as="p5">All bids &gt;</Paragraph>
      </div>
    </div>
  )
}

export default BidStatus
