// Local Components
import { IconsRow } from '@/components/shared'
import Heading from '@/stories/Heading'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Hero = (): JSX.Element => (
  <section className="bg-orange px-4 pb-20 pt-32 text-center sm:pb-44 sm:pt-44">
    <Heading as="h1" className="mb-4 text-yellow">
      Your fam, onchain
    </Heading>
    <Heading
      as="h2"
      className="mx-auto max-w-xs font-abc text-2xl leading-8 text-yellow sm:max-w-4xl sm:text-3xl sm:leading-10"
    >
      Fam is a space for music communities to grow, collaborate and collectively
      fund creative projects
    </Heading>
    <div className="pt-11 sm:pt-24">
      <IconsRow />
    </div>
  </section>
)

export default Hero
