'use client'

// Components
import { Button } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Form
 */

export const AddActionButton = (): JSX.Element => (
  <Button
    type="submit"
    className="float-right mt-8 w-full whitespace-nowrap sm:w-48"
  >
    Add action
  </Button>
)

export default AddActionButton
