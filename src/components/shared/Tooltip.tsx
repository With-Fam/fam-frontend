'use client'

// Framework
import { ReactNode } from 'react'

// Types
interface TooltipProps {
  children: ReactNode
  tooltipContent: ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Tooltip = ({ children, tooltipContent }: TooltipProps): JSX.Element => (
  <div className="group relative z-0 flex h-min w-min">
    <span>{children}</span>
    <span
      className="pointer-events-none absolute right-6 top-6 w-60 rounded-2xl bg-white p-4 text-grey
opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 sm:w-96"
    >
      {tooltipContent}
    </span>
  </div>
)

export default Tooltip
