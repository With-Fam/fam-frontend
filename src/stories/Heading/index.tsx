// Framework
import { createElement, ReactNode } from 'react'

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
  const commonClasses = 'font-medium';
  className = `${commonClasses} ${className}`;

  return createElement(as, { className }, children);
};

export default Heading
