'use client'

// Local Components
import { Close, LongArrow } from '@/components/icons'
import { PhaseName } from '@/components/shared'
import { useRouter } from 'next/navigation'

import { Maybe } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

type CreateContextNavigationProps = {
  step: number
  exitPath: string
  prev: () => void
  title: Maybe<string>
}

const variants = {
  initial: {
    opacity: 0,
    top: -5,
  },
  enter: {
    opacity: 1,
    top: 0,
  },
}

const MotionSVG = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="initial"
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  )
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
      <div
        className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-grey-light"
        onClick={() => {
          step === 0 ? router.push(exitPath) : prev()
        }}
      >
        <AnimatePresence>
          {step === 0 ? (
            <MotionSVG>
              <Close />
            </MotionSVG>
          ) : (
            <MotionSVG>
              <LongArrow />
            </MotionSVG>
          )}
        </AnimatePresence>
      </div>
      <PhaseName>{title}</PhaseName>
      <div className="w-8">&nbsp;</div>
    </div>
  )
}
