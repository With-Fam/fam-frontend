// Framework
import type { Metadata } from 'next'

// Local Components
import { ActionCard } from '@/modules/create-activity/components/action/ActionCard'

// Content
import ACTIONS_DATA from '@/content/create-activity/actions'
import APP_DATA from '@/content/create-activity/apps'

// Types
import { Heading } from '@/stories'

// Utils
import sortByTitle from '@/utils/sort-title'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Pick Action',
  description: 'Pick Action',
}

const PickActionPhaseActivity = (): JSX.Element => {
  const actionsSortedByTitle = sortByTitle(ACTIONS_DATA)
  const appsSortedByTitle = sortByTitle(APP_DATA)

  return (
    <>
      <section className="mb-10">
        <Heading
          as="h5"
          className="mt-18 mb-4 font-abcWide text-orange sm:mb-8"
        >
          Actions
        </Heading>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-6">
          {actionsSortedByTitle.map((action, index) => (
            <ActionCard
              key={index}
              {...action}
              onClick={() => {
                console.log('action::', action.id)
              }}
            />
          ))}
        </div>
      </section>
      <section className="mb-10">
        <Heading
          as="h5"
          className="mt-18 mb-4 font-abcWide text-orange sm:mb-8"
        >
          Apps
        </Heading>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-6">
          {appsSortedByTitle.map((action, index) => (
            <ActionCard
              key={index}
              {...action}
              onClick={() => {
                console.log('action::', action.id)
              }}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default PickActionPhaseActivity
