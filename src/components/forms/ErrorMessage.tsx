// Framework
import { useMemo } from 'react'

// Third Parties
import _get from 'lodash.get'
import { FieldError, useFormContext } from 'react-hook-form'

// Local Components
import { Paragraph } from '@/stories'

// Types
import { Maybe } from '@/types'
interface ErrorMessageProps {
  name: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ErrorMessage = ({ name }: ErrorMessageProps): Maybe<JSX.Element> => {
  const {
    formState: { errors },
  } = useFormContext()

  const error = useMemo((): FieldError | undefined => {
    const clean = name.replace(/[\]]/g, '')
    const sections = clean.split(/[\[\.]/g)
    const error = _get(errors, sections[0])
    let fieldError: FieldError | undefined

    if (Array.isArray(error)) {
      fieldError = error.root || _get(error, sections.slice(1).join('.'))
    } else if (error && clean.includes(String(error?.root?.type))) {
      const ErrorMessage = error?.root?.message || error?.message
      fieldError = {
        message: String(ErrorMessage),
        type: String(error?.root?.type),
      }
    }

    return fieldError
  }, [errors, name])

  if (!error) return null

  return (
    <Paragraph as="p5" className="font-xm mt-2 text-status-red">
      {error?.message}
    </Paragraph>
  )
}

export default ErrorMessage
