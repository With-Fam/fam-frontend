'use client'

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// Local Components
import ErrorMessage from './ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

// Types
interface TextAreaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string
  label: string
  name: string
  placeholder?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function TextArea({
  className,
  label,
  name,
  ..._props
}: TextAreaProps): JSX.Element {
  const { register } = useFormContext()
  return (
    <div className={twMerge('flex-1', className)}>
      <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
        <label className="mb-2 block font-abcMedium text-sm" htmlFor={name}>
          {label}
        </label>
        <textarea
          {..._props}
          {...register(name)}
          cols={1}
          rows={2}
          className="block w-full resize-none text-lg outline-0"
        />
      </div>
      <ErrorMessage name={name} />
    </div>
  )
}
