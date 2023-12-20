// Framework
import Link from 'next/link'

// Components
import { Paragraph } from '@/stories'
import { Button, IconsRow } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ExploreHeaderMobile = (): JSX.Element => (
  <section className="block sm:hidden px-4 w-full max-w-[896px] mx-auto">
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-center justify-center rounded-md bg-orange py-5">
        <div className="h-auto w-[235px]">
          <IconsRow className="flex h-16 items-center justify-center gap-4" />
        </div>
      </div>
      <Paragraph as="p3" className="pb-2 pt-4 text-black text-center">
        Your Fam
      </Paragraph>
      <Paragraph as="p5" className="pb-4 text-grey text-center">
        A community for your collective, label or fan club
      </Paragraph>
      <Link href=" /create-community" passHref className='block max-w-xs mx-auto'>
        <Button className="w-full max-w-xs mx-auto">Create a Fam</Button>
      </Link>
    </div>
  </section>
)

export default ExploreHeaderMobile
