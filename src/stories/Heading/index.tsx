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
    h1: 'text-h1 leading-h1',
    h2: 'text-h2 leading-h2',
    h3: 'text-h3 leading-h3',
    h4: 'text-h4 leading-h4',
    h5: 'text-h5 leading-h5',
  };

  const commonClasses = 'font-medium';
  const className = `${commonClasses} ${classNames[as]}`;

  return createElement(as, { className }, children);
};

export default Heading
