// Framework
import Image from 'next/image'
import Link from 'next/link'

// Local Components
import { Paragraph, Heading } from '@/stories'
import ExternalLink from '@/components/icons/ExternalLink'
import InfoMark from '@/components/icons/InfoMark'

// Content
import FOUNDERS_DATA from '@/content/community-profile/founders'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const FoundersComponent = (): JSX.Element => (
  <section className="mt-12 px-4 mx-auto max-w-[936px]">
    <Heading as="h5" className="mb-8 font-abcWide text-orange">
      Founders
    </Heading>
    {FOUNDERS_DATA.map((founder) => {
      return (
        <div
          key={founder.name}
          className="mb-4 flex items-center justify-between"
        >
          <div className="flex items-center justify-start gap-2">
            <Image
              src={founder.image.href}
              alt={founder.image.alt}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <Paragraph as="p3" className="flex items-center gap-1">
              {founder.name}
              <Link href={founder.href}>
                <ExternalLink />
              </Link>
            </Paragraph>
          </div>
          <Paragraph as="p3" className="flex items-center gap-1">
            {founder.status} <InfoMark />
          </Paragraph>
        </div>
      )
    })}
  </section>
)

export default FoundersComponent
