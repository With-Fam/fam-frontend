'use client'

// Local Components
import { Sections } from '@/modules/create-activity'
import { CreateActivityProvider } from '@/contexts/create-activity/CreateActivityContext'

/*--------------------------------------------------------------------*/

type CreateActivityPageProps = {
  params: {
    communityId: string
    activityId: string
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
