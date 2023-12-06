'use client'

// Components
import { Button } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Form
 */

export function AddActionButton(): JSX.Element {
  return (
    <Button
      type="submit"
      className="float-right mt-8 w-full whitespace-nowrap sm:w-48"
    >
      Add action
    </Button>
  )
}
