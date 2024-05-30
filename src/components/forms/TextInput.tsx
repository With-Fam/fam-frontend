'use client'

import { twMerge } from 'tailwind-merge'

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// Local Components
import ErrorMessage from './ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { Icon } from '@/components/Icon'

// Types
export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string
  name: string
  label: string
  containerClasses?: string
  labelIcon?: any
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
  containerClasses,
  labelIcon,
  ..._props
}: InputProps): JSX.Element {
  const { register, clearErrors } = useFormContext()

  return (
    <div className={twMerge('flex-1', className)}>
      <div
        className={`flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black ${containerClasses}`}
      >
        <label
          className="mb-2 block flex items-center gap-1 font-abcMedium text-sm"
          htmlFor={name}
        >
          {label} {labelIcon && <Icon id={labelIcon} fill="#ffffff" />}
        </label>
        <input
          {...register(name)}
          {..._props}
          type={type}
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

export default TextInput
