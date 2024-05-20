<<<<<<< HEAD
// Local Components
import { IconsRow } from '@/components/shared'
import Heading from '@/stories/Heading'
=======
// Framework
import Link from 'next/link'

// Local Components
import Heading from '@/stories/Heading'
import { Icons } from '@/components/home'
import { Paragraph } from '@/stories'
>>>>>>> origin/main

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Hero = (): JSX.Element => (
  <section className="bg-orange px-4 pb-20 pt-32 text-center sm:pb-44 sm:pt-44">
    <Heading as="h1" className="mb-4 text-yellow">
<<<<<<< HEAD
      Your fam, onchain
=======
      Find your fam
>>>>>>> origin/main
    </Heading>
    <Heading
      as="h2"
      className="mx-auto max-w-xs font-abc text-2xl leading-8 text-yellow sm:max-w-4xl sm:text-3xl sm:leading-10"
    >
      Fam is a space for music communities to grow, collaborate and collectively
      fund creative projects
    </Heading>
<<<<<<< HEAD
    <div className="pt-11 sm:pt-24">
      <IconsRow />
    </div>
=======
    <Icons />
    <Link href="/early-access" passHref>
      <Paragraph
        className="mx-auto mt-14 w-full max-w-xs rounded-[53px] bg-black px-4 py-2 text-white sm:px-6 sm:py-4"
        as="p2"
      >
        Get early access
      </Paragraph>
    </Link>
>>>>>>> origin/main
  </section>
)

export default Hero
