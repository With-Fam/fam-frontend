'use client'

// Framework
import { useRouter } from 'next/navigation'

// Local Components
import { Paragraph } from '@/stories'

// Content

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CreateActivityButton = (): JSX.Element => {
  const router = useRouter()
  return (
    <button
      type="button"
      className="mx-auto mt-4 flex w-max cursor-pointer items-center justify-center rounded-full bg-black px-4 py-2"
      onClick={() => {
        router.push('create-activity')
      }}
    >
      <Paragraph
        as="p5"
        className="whitespace-nowrap font-abc text-white"
      >
        New activity
      </Paragraph>
    </button>
  )
}

export default CreateActivityButton
