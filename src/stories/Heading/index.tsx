// Framework
import { createElement, ReactNode } from 'react'

// Types
interface EProps {
  children: ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Heading = ({ children, as }: EProps) => {
  const classNames = {
    h1: 'text-h1 font-medium leading-h1 text-black',
    h2: 'text-h2 font-medium leading-h2 text-black',
    h3: 'text-h3 font-medium leading-h3 text-black',
    h4: 'text-h4 font-medium leading-h4 text-black',
    h5: 'text-h5 font-medium leading-h5 text-black',
  }

  const className = classNames[as]

  return createElement(as, { className }, children)
}

export default Heading
