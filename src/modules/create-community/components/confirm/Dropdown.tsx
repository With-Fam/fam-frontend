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
  children: React.ReactNode
  text: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const DropDown = ({ children, text }: DropDownProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="my-2 cursor-pointer overflow-hidden text-left"
      onClick={() => setOpen(!open)}
    >
      <Paragraph
        as="p2"
        className={twMerge(
          "flex items-center justify-between px-4 py-2 text-left text-white r bg-black duration-300 ease-in-out",
          open ? 'rounded-t-lg' : 'rounded-lg'
        )}
      >
        {text}
        <span className="ml-2">
          <ChevronDown
            stroke="#fff"
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
          'bg-background-secondary overflow-hidden duration-300 ease-in-out rounded-lg',
          open ? 'max-h-screen' : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default DropDown
