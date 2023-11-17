'use client'

// Framework
import Link from 'next/link'

// Third Parties
import { useFormContext } from 'react-hook-form'

// Components
import { Button } from '@/components/shared'

// Types
type AddActionButtonProps = {
  activityId: string
  watchStates: string[]
}

/*--------------------------------------------------------------------*/

/**
 * Form
 */

const AddActionButton = ({
  activityId,
  watchStates,
}: AddActionButtonProps): JSX.Element => {
  const { watch } = useFormContext()
  const watchValues = watchStates.map((fieldName) => !!watch(fieldName))
  const isButtonEnabled = watchValues.every((value) => value)

  return (
    <Link href={`/create-activity?id=${activityId}`} passHref>
      <Button
        disabled={!isButtonEnabled}
        type="button"
        className="float-right mt-8 w-full whitespace-nowrap sm:w-48"
      >
        Add action
      </Button>
    </Link>
  )
}

export default AddActionButton
