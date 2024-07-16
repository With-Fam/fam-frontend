'use client'

import { CreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { Sections } from '@/modules/create-community/components'

export default function CreateCommunity(): JSX.Element {
  return (
    <>
      <CreateCommunityProvider>
        <Sections />
      </CreateCommunityProvider>
    </>
  )
}
