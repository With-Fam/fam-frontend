'use client'

// Framework
import { twMerge } from 'tailwind-merge'
import useSWR from 'swr'

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

// Local Components
import ErrorMessage from '@/components/forms/ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { getEnsName } from '@/utils/ens'
import SWR_KEYS from '@/constants/swrKeys'

// Types
import { Maybe } from '@/types'

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

/*--------------------------------------------------------------------*/

/**
 * Component
 */

export function InputENSAddress({
  className,
  label,
  name,
  onChange,
  value,
  ..._props
}: InputProps): JSX.Element {
  const { data: ensName } = useSWR(
    [SWR_KEYS.ENS, value ?? null],
    async () => await getEnsName(value as string)
  )
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
