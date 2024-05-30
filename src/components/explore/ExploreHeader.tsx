// Framework
import Link from 'next/link'

// Components
import { Paragraph } from '@/stories'
import Heading from '@/stories/Heading'
import { Button, IconsRow } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ExploreHeader = (): JSX.Element => (
  <section className="hidden w-full bg-orange p-8 text-center sm:block">
    <div className="rounded-2xl p-4">
      <Heading as="h1" className="mb-4 text-yellow">
        Your fam
      </Heading>
      <Heading
        as="h2"
        className="mx-auto max-w-xs font-abc text-2xl leading-8 text-yellow sm:max-w-md sm:text-3xl sm:leading-10"
      >
        A community for your collective, label or fan club
      </Heading>
      <div className="flex items-center justify-center rounded-md py-8">
        <div className="h-auto w-[235px]">
          <IconsRow className="flex h-16 items-center justify-center gap-4" />
        </div>
      </div>
      <Link href=" /create-community" passHref className="max-w-xs">
        <Button className="w-full max-w-xs">Create a Fam</Button>
      </Link>
    </div>
  </section>
)

export default ExploreHeader
