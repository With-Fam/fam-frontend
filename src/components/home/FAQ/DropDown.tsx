'use client'

// Framework
import { useState } from 'react'

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
const DropDown = ({ children, question }: DropDownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-2 rounded-lg bg-white p-8">
      <Paragraph
        as="p2"
        className="flex items-center justify-between text-left"
      >
        {question}
        <span className="ml-2 cursor-pointer" onClick={() => setOpen(!open)}>
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
        className={`
    overflow-hidden duration-300 ease-in-out
    ${open ? 'mt-8 max-h-screen' : 'max-h-0'}
  `}
      >
        <Paragraph as="p2" className="text-left text-grey">
          {children}
        </Paragraph>
      </div>
    </div>
  )
}

export default DropDown
