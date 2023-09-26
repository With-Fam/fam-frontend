// Local Components
import Heading from '@/stories/Heading'
import Paragraph from '@/stories/Paragraph'
import ChevronDown from '@/components/icons/ChevronDown'

// Content
import FAQ_DATA from '@/content/home/faq'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const FAQ = () => {
  return (
    <section className="bg-orange px-4 py-16 sm:py-24 sm:text-center">
      <Heading as="h3" className="w-full text-center text-yellow mb-8">
        How does it work?
      </Heading>
      <div className="mx-auto max-w-6xl">
        {FAQ_DATA.map((item, index) => (
          <div key={index} className="mt-2 rounded-lg bg-white p-8">
            <Paragraph
              as="p2"
              className="flex items-center justify-between text-left"
            >
              {item}{' '}
              <span>
                <ChevronDown className="ml-2" />
              </span>
            </Paragraph>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
