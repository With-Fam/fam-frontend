// Framework
import Image from 'next/image'

// Local Components
import BidStatus from '@/components/community/BidComponent/BidStatus'
import PlaceBid from '@/components/community/BidComponent/PlaceBid'
import BidDescription from '@/components/community/BidComponent/BidDescription'
import { Twitter, Globe, Discord } from '@/components/icons'

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
          className="relative -z-10 rounded-lg object-contain"
        />
      </div>
      <BidStatus />
      <PlaceBid />
      <BidDescription />
      <div className="flex gap-4">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Opens community's website"
        >
          <Globe />
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Opens community's x page"
        >
          <Twitter />
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Opens community's discord server"
        >
          <Discord />
        </a>
      </div>
    </div>
  </section>
)

export default BidComponent
