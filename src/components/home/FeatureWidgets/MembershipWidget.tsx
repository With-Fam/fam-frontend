// Framework
import Image from 'next/image'

// Local Components
import Paragraph from '@/stories/Paragraph'

// Types
interface EProps {
  image?: string
  title?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MembershipWidget = ({ title, image }: EProps) => (
  <div className="shadow-card mx-auto my-12 flex w-72 gap-2 p-3.5">
    <div className="flex w-full flex-col items-center justify-between gap-2">
      <Paragraph as="p5" className="mb-4">
        {title}
      </Paragraph>
      {image && (
        <Image
          src={image}
          alt=""
          width={240}
          height={240}
          className="mx-auto w-60 overflow-hidden rounded-lg object-cover"
        />
      )}
    </div>
  </div>
)

export default MembershipWidget
