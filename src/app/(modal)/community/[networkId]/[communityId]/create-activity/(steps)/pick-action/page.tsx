// Framework
import type { Metadata } from 'next'

// Local Components
// import {
//   ItemsManager,
//   ResponsiveTitleSection,
//   ItemsButton,
// } from '@/components/create-activity'

// Content
// import ACTIONS_DATA from '@/content/create-activity/actions'
// import POPULAR_ACTIONS_DATA from '@/content/create-activity/popular'

// Types
// import { ActionItemProps } from '@/types/create-activity'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Pick Action',
  description: 'Pick Action',
}

const PickActionPhaseActivity = (): JSX.Element => (
  <>
    {/* <ResponsiveTitleSection desktopText="All actions">
      Quick actions
    </ResponsiveTitleSection>
    <ItemsManager items={ACTIONS_DATA as ActionItemProps[]} />
    <ItemsButton
      className="mb-10 mt-8 block text-center sm:hidden"
      href="/create-activity/actions"
    >
      More actions
    </ItemsButton>
    <ResponsiveTitleSection className="sm:mt-10" desktopText="All apps">
      Popular apps
    </ResponsiveTitleSection>
    <ItemsManager items={POPULAR_ACTIONS_DATA as ActionItemProps[]} />
    <ItemsButton
      className="mt-8 block text-center sm:hidden"
      href="/create-activity/apps"
    >
      All apps
    </ItemsButton> */}
  </>
)

export default PickActionPhaseActivity
