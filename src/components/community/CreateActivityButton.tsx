'use client'

// Framework
import { useRouter } from 'next/navigation'

// Local Components
import { Cross } from '@/components/icons'

// Content

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CreateActivityButton = (): JSX.Element => {
  const router = useRouter()
  return (
    <div
      className="float-right mt-4 flex cursor-pointer items-center justify-center rounded-full bg-orange px-0 py-0 sm:px-4 sm:py-2"
      onClick={() => {
        router.push('/create-activity')
      }}
    >
      <span className="flex h-14 w-14 items-center justify-center sm:h-6 sm:w-6">
        <Cross />
      </span>
      <span className="ml-2 hidden whitespace-nowrap font-abc text-2xl text-white sm:flex">
        New activity
      </span>
    </div>
  )
}

export default CreateActivityButton
