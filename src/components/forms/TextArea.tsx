'use client'

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
// Local Components
import ErrorMessage from './ErrorMessage'
import { useFormContext } from 'react-hook-form'

// Types
interface TextAreaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string
  name: string
  placeholder?: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

function TextArea({ label, name, ..._props }: TextAreaProps): JSX.Element {
  const { register } = useFormContext()
  return (
    <div className="flex-1">
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

export default TextArea
