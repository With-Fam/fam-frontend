// Framework
import Image from 'next/image'
import Link from 'next/link'

// Types
import { ActionItemProps } from '@/types/create-activity'
interface CProps {
  action: ActionItemProps
}

// Components
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActionCard = ({
  action: { image, imageAlt, title, description, href },
}: CProps): JSX.Element => (
  <Link
    className="flex h-max w-full gap-4 rounded-lg bg-white  p-2 md:block md:h-[235px] md:gap-0"
    type="button"
    aria-label={`Selects ${title} action`}
    href={href}
    passHref
  >
    <div className="relative mb-0 h-16 w-16 flex-shrink-0 md:mb-2 md:h-[150px] md:w-full">
      <Image
        className="mx-auto h-16 w-16 overflow-hidden rounded-lg object-cover md:h-[150px] md:w-full"
        width={240}
        height={150}
        src={image}
        alt={imageAlt ?? title}
      />
    </div>
    <div className="text-left">
      <Paragraph as="p3" className="mb-2">
        {title}
      </Paragraph>
      <Paragraph as="p5" className="text-grey">
        {description}
      </Paragraph>
    </div>
  </Link>
)

export default ActionCard
