// Local Components
import Heading from '@/stories/Heading'
import Paragraph from '@/stories/Paragraph'

// Prep Component
const TextLine = ({ children }: { children: string }) => (
  <Paragraph as="p1" className="mb-10">
    {children}
  </Paragraph>
)

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CollectiveCulture = () => {
  return (
    <section className="bg-pink px-4 py-16 text-left text-orange sm:py-24 sm:text-center">
      <Heading as="h3" className="mb-4">
        Collective culture creation
      </Heading>
      <div className="mx-auto max-w-[900px]">
        <TextLine>
          Music collectives, record labels and fan clubs have historically been
          the birthplace for new ideas and cultural movements
        </TextLine>
        <TextLine>
          Fam provides tools for new types of online music groups to form around
          a common interest or goal
        </TextLine>
        <TextLine>
          Fund live events and shows, create drops with built-in splits,
          collaborate on creative projects and lots more
        </TextLine>
      </div>
    </section>
  )
}

export default CollectiveCulture
