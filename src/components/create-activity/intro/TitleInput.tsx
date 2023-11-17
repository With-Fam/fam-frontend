'use client'

// Types
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TitleInput = ({ name, ..._props }: InputProps): JSX.Element => {
  const { register } = useFormContext()
  return (
    <div className="flex flex-col items-start justify-start p-4">
      <input
        {..._props}
        {...register(name)}
        id={name}
        type="text"
        className="bg-transparent text-2xl text-black outline-0 placeholder:text-grey"
      />
    </div>
  )
}

export default TitleInput
