'use client'

// Framework
import { useState } from 'react'

// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'
import { ChevronDown } from '@/components/icons'

// Type
interface DropDownProps {
  children: string
  question: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const DropDown = ({ children, question }: DropDownProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="mt-2 rounded-lg bg-white p-8 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <Paragraph
        as="p2"
        className="flex items-center justify-between text-left"
      >
        {question}
        <span className="ml-2">
          <ChevronDown
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
          'overflow-hidden duration-300 ease-in-out',
          open ? 'mt-6 max-h-screen' : 'max-h-0'
        )}
      >
        <Paragraph as="p3" className="text-left text-grey">
          {children}
        </Paragraph>
      </div>
    </div>
  )
}

export default DropDown
