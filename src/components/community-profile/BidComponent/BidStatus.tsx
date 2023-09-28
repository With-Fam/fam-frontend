// Framework
import Image from 'next/image'

// Local Components
import { Heading, Paragraph } from '@/stories'
import CountDown from '@/components/community-profile/BidComponent/CountDown'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidStatus = (): JSX.Element => (
  <div className="flex w-full flex-col">
    <div className="mb-4 flex items-center justify-between">
      <Heading as="h5" className="font-abcWide">
        PC Music Club
      </Heading>
      <Paragraph as="p4" className="rounded-3xl bg-grey-light px-3 py-2">
        #22
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
      <Paragraph as="p2">0.05 ETH</Paragraph>
      <CountDown />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/assets/images/users/u5.jpeg"
          width={24}
          height={24}
          alt=""
          className="rounded-full object-cover"
        />
        <Paragraph as="p5" className="pl-2.5">
          iamnick.eth
        </Paragraph>
      </div>
      <Paragraph as="p5">All bids &gt;</Paragraph>
    </div>
  </div>
)

export default BidStatus
