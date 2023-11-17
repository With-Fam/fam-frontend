// Local Components
import { Logo } from '@/components/shared'
import Paragraph from '@/stories/Paragraph'

// Content
const FOOTER_DATA = ['Twitter', 'Blog', 'Discord', 'Docs', 'Privacy']

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Footer = (): JSX.Element => (
  <footer className="flex flex-col items-center justify-center pb-20 pt-14 sm:flex-row sm:px-10 sm:pb-10 sm:pt-10">
    <Logo color="#F54D18" />
    <div className="mx-auto mt-8 flex w-60 flex-wrap justify-center gap-6 sm:mt-0 sm:w-full sm:justify-end">
      {FOOTER_DATA.map((item, index) => (
        <a key={index} href="/" target="_black" rel="noopener noreferrer">
          <Paragraph as="p3" className="text-orange">
            {item}
          </Paragraph>
        </a>
      ))}
    </div>
  </footer>
)

export default Footer
