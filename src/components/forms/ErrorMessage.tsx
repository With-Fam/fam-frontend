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
    // let fieldError: FieldError | undefined

    // if (Array.isArray(currentError)) {
    //   fieldError =
    //     currentError.root || _get(currentError, sections.slice(1).join('.'))
    // } else if (
    //   currentError &&
    //   clean.includes(String(currentError?.root?.type))
    // ) {
    //   const ErrorMessage = currentError?.root?.message || currentError?.message
    //   fieldError = {
    //     message: String(ErrorMessage),
    //     type: String(currentError?.root?.type),
    //   }
    // }

    return _get(errors, sections)
  }, [errors, name])

  if (!error) return null

  return (
    <Paragraph as="p5" className="font-xm mt-2 text-status-red">
      {error?.message}
    </Paragraph>
  )
}

export default ErrorMessage
