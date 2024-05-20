// Framework
import { createElement, ReactNode } from 'react'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Types
interface EProps {
  children: ReactNode
<<<<<<< HEAD
  as: 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'
=======
  as: 'p1' | 'p2' | 'p3' | 'p4' | 'p5'
>>>>>>> origin/main
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Paragraph = ({ children, as, className }: EProps): JSX.Element => {
  const componentConfig = {
    p1: {
<<<<<<< HEAD
      class: 'leading-10 abc',
      style: { fontSize: '32px' },
    },
    p2: {
      class: 'text-lg sm:text-2xl leading-8 abc',
      style: {},
    },
    p3: {
      class: 'text-lg abc',
      style: { lineHeight: '22px' },
    },
    p4: {
      class: 'text-base abc',
      style: { lineHeight: '20px' },
    },
    p5: {
      class: 'text-sm leading-4 abc',
      style: {},
    },
    p6: {
      class: 'text-xs leading-3 abc',
      style: {},
    },
    p7: {
      class: 'text-xxs leading-2 abc',
      style: {},
=======
      class: 'leading-10 abc font-[32px]',
    },
    p2: {
      class: 'text-lg sm:text-2xl leading-8 abc',
    },
    p3: {
      class: 'text-lg abc leading-[22px]',
    },
    p4: {
      class: 'text-base abc leading-[20px]',
    },
    p5: {
      class: 'text-sm leading-4 abc',
>>>>>>> origin/main
    },
  }

  className = twMerge(componentConfig[as].class, className)
<<<<<<< HEAD
  const style = componentConfig[as].style

  return createElement('p', { className, style }, children)
=======

  return createElement('p', { className }, children)
>>>>>>> origin/main
}

export default Paragraph
