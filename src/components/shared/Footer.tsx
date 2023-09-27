// Local Components
import Logo from '@/components/shared/Logo'
import Paragraph from '@/stories/Paragraph'

// Content
const FOOTER_DATA = ['Twitter', 'Blog', 'Discord', 'Docs', 'Privacy']

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-center pb-20 pt-14 sm:pb-10 sm:pt-10 sm:px-10">
      <Logo color="#F54D18" />
      <div className="mt-8 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-6 mx-auto w-60 sm:w-full">
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
}

export default Footer
