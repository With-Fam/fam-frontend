'use client'

// Framwork
import { InputHTMLAttributes, useEffect, useState } from 'react'

// Third Parties
import { useFormContext } from 'react-hook-form'

// Components
import ErrorMessage from '@/components/forms/ErrorMessage'
import ConfirmIcon from '@/modules/create-community/components/confirm/ConfirmIcon'

// Types
type ConfirmCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  children: React.ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ConfirmCheckbox = ({
  children,
  name,
  ..._props
}: ConfirmCheckboxProps): JSX.Element => {
  const [checked, setChecked] = useState(false)
  const { register, watch } = useFormContext()

  const checkboxValue = watch(name)

  useEffect(() => {
    setChecked(checkboxValue)
  }, [checkboxValue])

  return (
    <div className="position relative z-0 mb-3 text-left">
      <ConfirmIcon
        active={checked}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      <label htmlFor={name} className="flex items-center gap-2">
        <input
          type="checkbox"
          className="relative z-10 h-6 w-6 opacity-0 shrink-0"
          {...register(name)}
          {..._props}
        />
        <span className="text-grey">{children}</span>
      </label>
      <ErrorMessage name={name} />
    </div>
  )
}
export default ConfirmCheckbox
