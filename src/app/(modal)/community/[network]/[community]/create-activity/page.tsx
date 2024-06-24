'use client'

// Local Components
import { Sections } from '@/modules/create-activity'
import { CreateActivityProvider } from '@/contexts/CreateActivityProvider'

/*--------------------------------------------------------------------*/

type CreateActivityPageProps = {
  params: {
    community: string
    activityId: string
    network: string
  }
}

export default function CreateActivity(
  _props: CreateActivityPageProps
): JSX.Element {
  return (
    <CreateActivityProvider {..._props}>
      <Sections />
    </CreateActivityProvider>
  )
}
