import { PropsWithChildren } from 'react'

// Data
import { TOGGLE_DATA } from '@/content/community'
import { TabProvider } from '@/contexts/tabs'

type Props = PropsWithChildren<{
  params: {
    communityId: string
  }
  search: { [key: string]: string }
}>

export default function CommunityLayout({
  children,
  params,
}: Props): JSX.Element {
  console.log('_params:', params)
  return <TabProvider items={TOGGLE_DATA}>{children}</TabProvider>
}
