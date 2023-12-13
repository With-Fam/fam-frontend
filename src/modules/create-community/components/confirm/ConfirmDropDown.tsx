'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'
import { ChevronDown } from '@/components/icons'

// Type
interface ConfirmDropDownProps {
  children: React.ReactNode
  text: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const ConfirmDropDown = ({
  children,
  text,
}: ConfirmDropDownProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={twMerge(
        'my-2 cursor-pointer overflow-hidden bg-white text-left',
        open ? 'rounded-t-lg' : 'rounded-lg'
      )}
      onClick={() => setOpen(!open)}
    >
      <Paragraph
        as="p3"
        className="flex items-center justify-between p-5 text-left duration-300 ease-in-out"
      >
        {text}
        <span className="ml-2">
          <ChevronDown
            stroke="#000"
            className={`
            transform-gpu transition-transform duration-300
            ease-in-out
            ${open ? 'rotate-90' : 'rotate-0'}
          `}
          />
        </span>
      </Paragraph>
      <div
        className={twMerge(
          'overflow-hidden rounded-lg bg-background-secondary duration-300 ease-in-out',
          open ? 'max-h-screen' : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default ConfirmDropDown
