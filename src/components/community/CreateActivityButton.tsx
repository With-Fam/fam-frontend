'use client'

// Framework
import { useRouter } from 'next/navigation'

// Local Components
import { Paragraph } from '@/stories'
import { Button } from '@/components/shared'

// Helpers
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { twJoin } from 'tailwind-merge'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CreateActivityButton = (): JSX.Element => {
  const router = useRouter()
  const { isAuthenticated } = useCheckAuth()

  return (
    <Button
      type="button"
      className={twJoin(
        'mx-auto mt-4 flex w-max items-center justify-center rounded-full bg-black px-4 py-2',
        isAuthenticated ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
      disabled={!isAuthenticated}
      onClick={() => {
        router.push('create-activity')
      }}
    >
      <Paragraph as="p5" className="whitespace-nowrap font-abc text-white">
        {!isAuthenticated ? 'Login for new activity' : 'New activity'}
      </Paragraph>
    </Button>
  )
}

export default CreateActivityButton
