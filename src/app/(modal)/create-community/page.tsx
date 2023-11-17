'use client'

import { CreateCommunityProvider } from '@/contexts/create-community'
import { Sections } from '@/modules/create-community/components'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export default function CreateCommunity(): JSX.Element {
  return (
    <CreateCommunityProvider>
      <Sections />
    </CreateCommunityProvider>
  )
}
