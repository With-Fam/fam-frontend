import Image from 'next/image'
import { ActionItemProps } from '@/types/create-activity'
import Paragraph from '@/stories/Paragraph'
import useIsMobile from '@/hooks/useIsMobile'

interface ActionCardProps extends ActionItemProps {
  onClick: () => void
}

export function ActionCard({
  image,
  mobile_image,
  imageAlt,
  title,
  description,
  onClick,
}: ActionCardProps): JSX.Element {
  const { isMobile } = useIsMobile()

  return (
    <div
      className="flex h-auto w-full cursor-pointer gap-4 rounded-lg  bg-white p-2 hover:shadow-sm md:block md:gap-0"
      onClick={onClick}
    >
      <div
        className="relative mb-0 aspect-[1/1] w-[64px] flex-shrink-0 md:mb-2 
      md:aspect-[894/441] md:w-full"
      >
        <Image
          className="absolute left-0 top-0 size-full rounded-lg"
          layout="fill"
          src={isMobile ? mobile_image : image}
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
