// Framework
import { createElement, ReactNode } from 'react'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Types
interface EProps {
  children: ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  className?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Heading = ({ children, as, className }: EProps) => {
  const commonClasses = 'font-abcMedium'
  className = twMerge(commonClasses, className)

  return createElement(as, { className }, children)
}

export default Heading
