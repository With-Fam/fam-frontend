// Local Components
import { Heading, Paragraph } from '@/stories'
import CountDown from '@/components/community/BidComponent/CountDown'

// Types
import { ExploreDaoFragment } from '@/data/subgraph/sdk.generated'

type BidStatusProps = Pick<ExploreDaoFragment, 'dao' | 'endTime' | 'token'> & {
  highestBid?: bigint
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidStatus = ({
  dao,
  endTime,
  highestBid,
  token,
}: BidStatusProps): JSX.Element => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Heading as="h5" className="font-abcWide">
          {dao?.name}
        </Heading>
        <Paragraph as="p4" className="rounded-3xl bg-grey-light px-3 py-2">
          #{token?.tokenId}
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
          {highestBid ? `${Number(highestBid) / 1e18} ETH` : 'NONE'}
        </Paragraph>
        <CountDown endTime={endTime} />
      </div>
    </>
  )
}
export default BidStatus
