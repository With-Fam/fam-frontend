// Framework
import { createElement, ReactNode } from 'react'

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

const Paragraph = ({ children, as, className }: EProps) => {
  const componentConfig = {
    p1: {
      class: 'leading-10',
      style: { fontSize: '32px' },
    },
    p2: {
      class: 'text-lg sm:text-2xl leading-8',
      style: {},
    },
    p3: {
      class: 'text-lg',
      style: { lineHeight: '22px' },
    },
    p4: {
      class: 'text-base',
      style: { lineHeight: '20px' },
    },
    p5: {
      class: 'text-sm leading-4',
      style: {},
    },
  }

  className = `${componentConfig[as].class} ${className}`
  const style = componentConfig[as].style

  return createElement('p', { className, style }, children)
}

export default Paragraph
