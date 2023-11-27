// Types
import { PropsWithChildren } from 'react'
type CommunityLayoutProps = PropsWithChildren<{
  params: {
    communityId: string
  }
  search: { [key: string]: string }
}>
// Data
import { TOGGLE_DATA } from '@/content/community'

// Components
import { TabList } from '@/components/community'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export default function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps): JSX.Element {
  console.log('_params:', params)
  return (
    <>
      <TabList items={TOGGLE_DATA} />
      {children}
    </>
  )
}
