// Types
import type { PropsWithChildren } from 'react'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CreateCommunityLayout = ({
  children,
}: PropsWithChildren): JSX.Element => {
  return (
    <div className="z-30 h-full w-full bg-background px-4 text-left sm:text-center">
      <div className="relative mx-auto mt-8 max-w-2xl">{children}</div>
    </div>
  )
}

export default CreateCommunityLayout
