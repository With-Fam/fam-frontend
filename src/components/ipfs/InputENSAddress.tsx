'use client'

import { twMerge } from 'tailwind-merge'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import ErrorMessage from '@/components/forms/ErrorMessage'
import { useFormContext } from 'react-hook-form'
import useEnsName from '@/hooks/useEnsName'

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'value'
  > {
  value?: string
  className?: string
  name: string
  label: string
}

export function InputENSAddress({
  className,
  label,
  name,
  onChange,
  value,
  ..._props
}: InputProps): JSX.Element {
  const { ensName } = useEnsName(value as string)
  const { clearErrors } = useFormContext()

  return (
    <div className={twMerge('flex-1', className)}>
      <div className="flex flex-col items-start justify-start rounded-xl bg-white p-4 text-black">
        <label className="mb-2 block font-abcMedium text-sm" htmlFor={name}>
          {label}
        </label>
        <input
          {..._props}
          onChange={onChange}
          type="text"
          value={(ensName ?? value) as string}
          autoComplete="off"
          onBlur={() => clearErrors(name)}
          id={name}
          className="block w-full text-lg outline-0"
        />
      </div>
      <ErrorMessage name={name} />
    </div>
  )
}
