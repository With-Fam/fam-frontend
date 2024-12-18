// Local Components
import { Heading, Paragraph } from '@/stories'
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
          {item.answer.map((answer, paragraph) => {
            if (typeof answer === 'string') {
              return (
                <Paragraph
                  as="p3"
                  className="mb-4 text-left text-grey"
                  key={paragraph}
                >
                  {answer}
                </Paragraph>
              )
            }

            return (
              <ul className="list-inside list-disc pl-8" key={paragraph}>
                {answer.map((text, lineIndex) => (
                  <li className="mb-4 text-left text-grey" key={lineIndex}>
                    {text}
                  </li>
                ))}
              </ul>
            )
          })}
        </DropDown>
      ))}
    </div>
  </section>
)

export default FAQ
