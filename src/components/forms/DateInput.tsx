'use client'

// Third Parties
import { twMerge } from 'tailwind-merge'
import { useFormContext } from 'react-hook-form'

// Local Components
import ErrorMessage from './ErrorMessage'

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
  const { clearErrors, register } = useFormContext()

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
