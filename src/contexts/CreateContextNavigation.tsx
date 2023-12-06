'use client'

// Local Components
import { Close, LongArrow } from '@/components/icons'
import { Maybe } from '@/types'
import { PhaseName } from '@/components/shared'
import { useRouter } from 'next/navigation'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type CreateContextNavigationProps = {
  step: number
  exitPath: string
  prev: () => void
  title: string
}

export const CreateContextNavigation = ({
  step,
  prev,
  title,
  exitPath,
}: CreateContextNavigationProps): Maybe<JSX.Element> => {
  const router = useRouter()
  return (
    <div className="h-18 flex w-full shrink flex-row items-center justify-between py-2">
      <div className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-grey-light">
        {step === 0 ? (
          <div onClick={() => router.push(exitPath)}>
            <Close />
          </div>
        ) : (
          <div onClick={prev}>
            <LongArrow />
          </div>
        )}
      </div>
      <PhaseName>{title}</PhaseName>
      <div className="w-8">&nbsp;</div>
    </div>
  )
}
