// Framework
'use client'
import { usePathname } from 'next/navigation'

// Local Components
import { Logo } from '@/components/shared'
import Paragraph from '@/stories/Paragraph'

// Content
const FOOTER_DATA = [
  { name: 'Twitter', url: 'https://twitter.com/withfam_' },
  { name: 'Discord', url: 'https://discord.gg/nuYwCzDjpc' },
]

/*--------------------------------------------------------------------*/
/**
 * Component
 */

const Footer = (): JSX.Element | null => {
  const pathname = usePathname()

  if (pathname !== '/') {
    return null
  }

  return (
    <footer className="flex flex-col items-center justify-center pb-20 pt-14 sm:flex-row sm:px-10 sm:pb-10 sm:pt-10">
      <Logo color="#F54D18" />
      <div className="mx-auto mt-8 flex w-60 flex-wrap justify-center gap-6 sm:mt-0 sm:w-full sm:justify-end">
        {FOOTER_DATA.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Paragraph as="p3" className="text-orange">
              {item.name}
            </Paragraph>
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
