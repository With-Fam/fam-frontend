'use client'

import { Button } from '@/components/shared'

export const AddActionButton = (): JSX.Element => {
  return (
    <Button
      type="submit"
      className="float-right mt-8 w-full whitespace-nowrap sm:w-48"
    >
      Add action
    </Button>
  )
}

export default AddActionButton
