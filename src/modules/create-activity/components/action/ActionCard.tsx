// Framework
import Image from 'next/image'

// Types
import { ActionItemProps } from '@/types/create-activity'

// Components
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

interface ActionCardProps extends ActionItemProps {
  onClick: () => void
}

export function ActionCard({
  image,
  imageAlt,
  title,
  description,
  onClick,
}: ActionCardProps): JSX.Element {
  return (
    <div
      className="flex h-auto w-full cursor-pointer gap-4 rounded-lg  bg-white p-2 hover:shadow-sm md:block md:gap-0"
      onClick={onClick}
    >
      <div className="relative mb-0 aspect-video flex-shrink-0 md:mb-2 md:w-full">
        <Image
          className="h-auto w-full rounded-lg"
          width={894}
          height={441}
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
    </div>
  )
}
