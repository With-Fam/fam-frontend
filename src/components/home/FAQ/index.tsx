// Local Components
import { Heading } from '@/stories'
import DropDown from '@/stories/Dropdown'

// Content
import FAQ_DATA from '@/content/home/faq'

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const FAQ = (): JSX.Element => (
  <section className="bg-orange px-4 py-16 sm:py-24 sm:text-center">
    <Heading as="h3" className="mb-8 w-full text-center text-yellow">
      How does it work?
    </Heading>
    <div className="mx-auto max-w-6xl">
      {FAQ_DATA.map((item, index) => (
        <DropDown key={index} question={item.question}>
          {item.answer}
        </DropDown>
      ))}
    </div>
  </section>
)

export default FAQ
