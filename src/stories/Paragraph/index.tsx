// Framework
import { createElement, ReactNode } from 'react'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Types
interface EProps {
  children: ReactNode
  as: 'p1' | 'p2' | 'p3' | 'p4' | 'p5'
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Paragraph = ({ children, as, className }: EProps): JSX.Element => {
  const componentConfig = {
    p1: {
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
    },
  }

  className = twMerge(componentConfig[as].class, className)

  return createElement('p', { className }, children)
}

export default Paragraph
