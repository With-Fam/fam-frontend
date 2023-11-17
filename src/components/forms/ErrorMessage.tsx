// Local Components
import { useMemo } from 'react'
import _get from 'lodash.get'

import { Paragraph } from '@/stories'
import { Maybe } from '@/types'
import { FieldError, useFormContext } from 'react-hook-form'

// Types
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

  const error = useMemo((): FieldError => {
    const clean = name.replace(/[\]]/g, '')
    const sections = clean.split(/[\[\.]/g)
    return _get(errors, sections) as FieldError
  }, [errors, name])

  if (!error) return null

  return (
    <Paragraph as="p5" className="font-xm mt-2 text-status-red">
      {error?.message}
    </Paragraph>
  )
}

export default ErrorMessage
