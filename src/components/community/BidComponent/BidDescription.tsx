// Framework
import Image from 'next/image'

// Local Components
import { Paragraph } from '@/stories'

// Types
import {
  // CurrentAuctionFragment,
  DaoFragment,
  TokenFragment,
} from '@/data/subgraph/sdk.generated'
type BidDescriptionProps = {
  page: any
  //CurrentAuctionFragment
  token: TokenFragment
  metaData: DaoFragment
}

// Utils
import { convertIpfsUrl } from '@/utils/helpers'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidDescription = ({
  page,
  token,
  metaData,
}: BidDescriptionProps): JSX.Element => {
  const imageSrc = convertIpfsUrl(metaData.contractImage || '')

  return (
    <div className="col-span-1 flex w-full flex-col">
      <div className="mb-4 flex items-center">
        <Image
          src={imageSrc}
          width={40}
          height={40}
          alt=""
          className="mr-3 h-10 w-10 rounded-full object-cover"
        />
        <Paragraph as="p2">{page?.dao?.name}</Paragraph>
      </div>
      <div>
        {token?.dao?.description.split('\\n').map((paragraph, index) => (
          <Paragraph key={index} as="p4" className="mb-2">
            {paragraph}
          </Paragraph>
        ))}
      </div>
    </div>
  )
}

export default BidDescription
