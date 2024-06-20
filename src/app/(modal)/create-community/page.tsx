'use client'

import { CreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { Sections } from '@/modules/create-community/components'
import { Suspense } from 'react'

export default function CreateCommunity(): JSX.Element {
  return (
    <Suspense>
      <CreateCommunityProvider>
        <Sections />
      </CreateCommunityProvider>
    </Suspense>
  )
}
