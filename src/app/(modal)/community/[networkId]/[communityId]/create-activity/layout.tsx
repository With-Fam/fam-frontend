// Types
import type { PropsWithChildren } from 'react'

// Components
import { ActivityNavigation } from '@/components/create-activity'
import { CreateActivityForm } from '@/modules/create-activity'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CreateActivityLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <CreateActivityForm>
    <div className="z-30 flex h-full w-full grow flex-col bg-background text-left sm:text-center">
      <ActivityNavigation />
      <div className="relative mx-auto flex w-full max-w-[1014px] flex-1 flex-col justify-between">
        {children}
      </div>
    </div>
  </CreateActivityForm>
)

export default CreateActivityLayout
