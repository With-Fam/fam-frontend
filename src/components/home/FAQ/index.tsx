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
<<<<<<< HEAD
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
              <ul className="pl-8 list-inside list-disc" key={paragraph}>
                {answer.map((text, lineIndex) => (
                  <li className="mb-4 text-left text-grey" key={lineIndex}>
                    {text}
                  </li>
                ))}
              </ul>
            )
          })}
=======
          {item.answer.map((paragraph, indexTwo) => (
            <Paragraph
              as="p3"
              className="mb-4 block text-left text-grey"
              key={indexTwo}
            >
              {paragraph}
            </Paragraph>
          ))}
          {item.bullets &&
            item.bullets.map((bullet, indexTwo) => (
              <span
                className="mb-4 block pl-8 text-left text-grey"
                key={indexTwo}
              >
                &#8226; {bullet}
              </span>
            ))}
>>>>>>> origin/main
        </DropDown>
      ))}
    </div>
  </section>
)

export default FAQ
