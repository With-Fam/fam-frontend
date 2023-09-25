// Framework
import { createElement, ReactNode } from 'react'

// Types
interface EProps {
  children: ReactNode
  as: 'p1' | 'p2' | 'p3' | 'p4' | 'p5'
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Heading = ({ children, as }: EProps) => {
  const classNames = {
    p1: 'text-p1 leading-10',
    p2: 'text-2xl leading-8',
    p3: 'text-lg leading-p3',
    p4: 'text-base leading-p4',
    p5: 'text-sm leading-4',
  }

  const className = classNames[as]

  return createElement('p', { className }, children)
}

export default Heading
