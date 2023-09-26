// Local Components
import Heading from '@/stories/Heading'
import Icons from '@/components/home/Icons'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Hero = () => {
  return (
    <section className="bg-orange pb-20 pt-32 px-4 text-center sm:pb-44 sm:pt-44">
      <Heading as="h1" className="mb-4 text-yellow">
        Your fam, onchain
      </Heading>
      <Heading
        as="h2"
        className="mx-auto text-2xl font-normal leading-8 text-yellow max-w-xs sm:text-3xl sm:leading-10 sm:max-w-4xl"
      >
        Fam is a space for music communities to grow, collaborate and
        collectively fund creative projects
      </Heading>
      <Icons />
    </section>
  )
}

export default Hero
