'use client'

import { twMerge } from 'tailwind-merge'

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// Local Components
import ErrorMessage from './ErrorMessage'
import { useFormContext } from 'react-hook-form'

// Types
export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string
  name: string
  label: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

function TextInput({
  className,
  label,
  name,
  type = 'text',
  ..._props
}: InputProps): JSX.Element {
  const { register, clearErrors } = useFormContext()

  return (
    <div className={twMerge('flex-1', className)}>
      <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
        <label className="mb-2 block font-abcMedium text-sm" htmlFor={name}>
          {label}
        </label>
        <input
          {...register(name)}
          {..._props}
          type={type}
          onBlur={() => clearErrors(name)}
          id={name}
          className="block w-full text-lg outline-0"
        />
      </div>
      <ErrorMessage name={name} />
    </div>
  )
}

export default TextInput
