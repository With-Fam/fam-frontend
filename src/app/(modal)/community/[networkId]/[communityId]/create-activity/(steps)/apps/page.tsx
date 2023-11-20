// Framework
import type { Metadata } from 'next'

// Local Components
import { Heading } from '@/stories'
// import { RowCard } from '@/components/create-activity'

// Content
// import POPULAR_ACTIONS_DATA from '@/content/create-activity/popular'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Pick App',
  description: 'Pick App',
}

const AppsPage = (): JSX.Element => (
  <>
    <Heading as="h5" className="mt-18 mb-4 font-abcWide text-orange">
      All apps
    </Heading>
    <div className="grid gap-2">
      {/* {POPULAR_ACTIONS_DATA.map((action, index) => (
        <RowCard
          key={index}
          action={action}
        />
      ))} */}
    </div>
  </>
)

export default AppsPage
