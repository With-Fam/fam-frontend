'use client'

import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// Local Components
import ErrorMessage from './ErrorMessage'
import { useFormContext } from 'react-hook-form'

// Types
import { InputProps } from './TextInput'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function DateInput({
  className,
  defaultValue,
  label,
  name,
  ..._props
}: Omit<InputProps, 'type'>): JSX.Element {
  const { clearErrors, register, setValue } = useFormContext()

  return (
    <div className={twMerge('flex-1', className)}>
      <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
        <label className="mb-2 block font-abcMedium text-sm" htmlFor={name}>
          {label}
        </label>
        <input
          {...register(name)}
          {..._props}
          type="date"
          onBlur={() => clearErrors(name)}
          id={name}
          className={twMerge(
            'block w-full bg-white text-lg outline-0',
            _props.disabled ? 'cursor-not-allowed opacity-30' : ''
          )}
        />
      </div>
      <ErrorMessage name={name} />
    </div>
  )
}
