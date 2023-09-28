// Framework
import Image from 'next/image'

// Local Components
import { Heading, Paragraph } from '@/stories'
import CountDown from '@/components/community-profile/BidComponent/CountDown'
import { QuestionMark } from '@/components/icons'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidComponent = (): JSX.Element => (
  <section className="px-4">
    <div className="gid-cols-1 m-auto grid w-full max-w-4xl gap-8 md:grid-cols-2">
      <div className="relative col-span-1 aspect-square w-full rounded-lg">
        <Image
          src="/assets/images/widgets/w2.png"
          alt=""
          fill
          sizes="100vw; md:50vw"
          className="rounded-lg object-contain"
        />
      </div>
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
        <div className="mx-auto mb-4 mt-5 flex h-14 w-full max-w-2xl items-center gap-2 rounded-lg bg-grey-light px-4 py-2">
          <input
            className="flex-1 bg-transparent outline-0"
            type="text"
            name="bid-community"
            id="bid-community"
            placeholder="0.05 ETH or more"
          />
          <QuestionMark />
        </div>
        <button
          type="button"
          className="mx-auto mb-10 block w-full rounded-full bg-black py-4 text-white md:max-w-xs"
        >
          Place Bid
        </button>
      </div>
      <div className="col-span-1 flex w-full flex-col">
        <div className="mb-7 flex items-center">
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
          PC Music Club is the onchain extension of the PC Music collective,
          known for redefining pop culture and digital aesthetics. Members
          become not just fans but co-creators in our community and are able to
          vote on our future projects, exclusive releases, and even the
          collective&apos;s artistic direction. As a member, you&apos;ll have
          access to exclusive NFTs, from one-of-a-kind digital vinyls to tokens
          that unlock real-world experiences
        </Paragraph>
      </div>
    </div>
  </section>
)

export default BidComponent
