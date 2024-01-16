'use client'
// Framework
import { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

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

export function MotionShow({ children }: PropsWithChildren): JSX.Element {
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
