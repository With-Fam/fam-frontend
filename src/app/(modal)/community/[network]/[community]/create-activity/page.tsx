'use client'

// Local Components
import { Sections } from '@/modules/create-activity'
import { CreateActivityProvider } from '@/contexts/create-activity/CreateActivityContext'
import { Button } from '@/components/shared'
import WalletConnectActivityButton from '@/components/create-activity/WalletConnectActivityButton'

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
      <WalletConnectActivityButton />
    </CreateActivityProvider>
  )
}
