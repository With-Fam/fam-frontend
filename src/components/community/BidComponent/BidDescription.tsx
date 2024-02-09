// Framework
import { useState } from 'react'

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
import { HandleImage } from '@/components/shared/HandleImage'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const BidDescription = ({
  page,
  token,
  metaData,
}: BidDescriptionProps): JSX.Element => {
  const [imageError, setImageError] = useState(false)
  const imageSrc = convertIpfsUrl(metaData.contractImage || '')
  console.log(imageSrc)
  // console.log(token?.image)
  console.log('metaData::', metaData)
  console.log('page::', page)
  return (
    <div className="col-span-1 flex w-full flex-col">
      <div className="mb-4 flex items-center">
        {!imageError && (
          <HandleImage
            src={imageSrc}
            width={40}
            height={40}
            alt=""
            className="mr-3 h-10 w-10 rounded-full object-cover"
            onError={() => setImageError(true)}
            onErrorCapture={() => setImageError(true)}
          />
        )}
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
