// Types
import type { PropsWithChildren } from 'react'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function ModalLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className="z-30 flex w-full grow bg-background px-4 text-left sm:text-center">
      <div className="relative mx-auto mt-8 flex max-w-3xl grow flex-col">
        {children}
      </div>
    </div>
  )
}
