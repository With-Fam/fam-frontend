// Components
import { Paragraph } from '@/stories'

// Types
type TotalAmountBoxProps = {
  title: string
  valueEth: string
  valueCurrency: string | number
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TotalAmountBox = ({
  title,
  valueEth,
  valueCurrency,
}: TotalAmountBoxProps): JSX.Element => (
  <div className="mb-6">
    <Paragraph as="p4" className="mb-2 text-orange">
      {title}
    </Paragraph>
    <div className="flex items-center justify-between">
      <Paragraph as="p2" className="">
        {valueEth} ETH
      </Paragraph>
      <Paragraph as="p5" className="text-grey">
        ${valueCurrency}
      </Paragraph>
    </div>
  </div>
)

export default TotalAmountBox
