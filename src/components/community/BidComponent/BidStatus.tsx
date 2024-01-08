// Local Components
import { Heading, Paragraph } from '@/stories'
import CountDown from '@/components/community/BidComponent/CountDown'

// Types
import { ExploreDaoFragment } from '@/data/subgraph/sdk.generated'
type BidStatusProps = {
  page: ExploreDaoFragment
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidStatus = ({ page }: BidStatusProps): JSX.Element => (
  <>
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
        {page?.highestBid?.amount
          ? `${Number(page?.highestBid?.amount) / 1e18} ETH`
          : 'NONE'}
      </Paragraph>
      <CountDown page={page} />
    </div>
  </>
)

export default BidStatus
