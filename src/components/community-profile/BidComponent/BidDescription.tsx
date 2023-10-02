// Framework
import Image from 'next/image'

// Local Components
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidDescription = (): JSX.Element => (
  <div className="col-span-1 flex w-full flex-col">
    <div className="mb-4 flex items-center">
      <Image
        src="/assets/images/widgets/w2.png"
        width={40}
        height={40}
        alt=""
        className="mr-3 h-10 w-10 rounded-full object-cover"
      />
      <Paragraph as="p2">PC Music Club</Paragraph>
    </div>
    <Paragraph as="p4">
      PC Music Club is the onchain extension of the PC Music collective, known
      for redefining pop culture and digital aesthetics. Members become not just
      fans but co-creators in our community and are able to vote on our future
      projects, exclusive releases, and even the collective&apos;s artistic
      direction. As a member, you&apos;ll have access to exclusive NFTs, from
      one-of-a-kind digital vinyls to tokens that unlock real-world experiences
    </Paragraph>
  </div>
)

export default BidDescription
