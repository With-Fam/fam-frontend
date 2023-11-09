// Framework
import Image from 'next/image'

// Local Components
import Paragraph from '@/stories/Paragraph'
import { twMerge } from 'tailwind-merge'

// Types
interface EProps {
  cards?: {
    title: string
    image: string
    description: string
  }[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CollaborateWidget = ({ cards }: EProps): JSX.Element => {
  const positions = [
    '-right-[2rem] -top-[1rem] z-20',
    '-left-20 -bottom-14 z-40',
    '-left-[2rem] -top-[1.5rem] z-30',
  ]

  return (
    <div className="relative z-0 w-1 h-1 top-10 left-1/2 -translate-x-1/2">
      {cards &&
        cards.map((card, index) => (
          <div
            key={index}
            className={twMerge(
              'shadow-row absolute flex h-[50px] w-[180px] rounded-[8.363px] p-2 bg-white',
              positions[index]
            )}
          >
            <Image
              src={card.image}
              alt=""
              width={33}
              height={33}
              className="h-[33.454px] w-[33.454px]"
            />
            <div className="ml-2">
              <Paragraph
                as="p3"
                className="mb-[4.18px] text-[9.409px] leading-[11.5px] text-black"
              >
                {card.title}
              </Paragraph>
              <Paragraph
                as="p3"
                className="text-[7.318px] leading-[8.363px] text-grey"
              >
                {card.description}
              </Paragraph>
            </div>
          </div>
        ))}
    </div>
  )
}

export default CollaborateWidget
