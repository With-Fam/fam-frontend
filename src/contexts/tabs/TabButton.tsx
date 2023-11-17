// Third Parties
import { twMerge } from 'tailwind-merge'

// Local Components
import { Paragraph } from '@/stories'
import { Dispatch, SetStateAction } from 'react'

// Types
export interface TabButtonItem {
  id: string
  label: string
}

interface Props extends TabButtonItem {
  active: boolean
  onChange: Dispatch<SetStateAction<string>>
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function TabButton({
  active = false,
  id,
  label,
  onChange,
}: Props): JSX.Element {
  return (
    <button
      className={twMerge(
        'w-min rounded-3xl px-3 py-2 sm:px-4',
        active ? 'bg-grey-light' : ''
      )}
      aria-label={`Toggle to ${label} type`}
      onClick={() => onChange(id)}
      type="button"
    >
      <Paragraph as="p4">{label}</Paragraph>
    </button>
  )
}
