// Framework
import Image from 'next/image'
import Link from 'next/link'

// Local Components
import { Paragraph } from '@/stories'

// Types
interface DropProps {
  drop: {
    community: {
      name: string
      image: string
    }
    href: string
    title: string
    value: string
    image: {
      href: string
      alt: string
    }
  }
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const RecentDrops = ({ drop }: DropProps): JSX.Element => {
  const { href, image, title, value, community } = drop

  return (
    <Link href={href} passHref>
      <div className="relative z-0 w-full rounded-lg bg-white p-2">
        <Image
          src={image.href}
          alt={image.alt}
          width={340}
          height={224}
          className="h-56 w-full object-cover object-left"
        />
        <Paragraph as="p3" className="whitespace-no-wrap truncate pb-2 pt-3">
          {title}
        </Paragraph>
        <Paragraph as="p4" className="text-grey">
          {value}
        </Paragraph>
        <div className="absolute left-4 top-4 z-10 flex items-center justify-start gap-1 rounded-3xl bg-white py-1 pl-1 pr-2">
          <Image
            src={community.image}
            alt=""
            className="h-4 w-4 rounded-full"
            width={16}
            height={16}
          />
          <Paragraph as="p5" className="text-xs leading-3">
            {community.name}
          </Paragraph>
        </div>
      </div>
    </Link>
  )
}

export default RecentDrops
