'use client'

import { useRouter } from 'next/navigation'
import { Paragraph } from '@/stories'
import { Button } from '@/components/shared'
import { twJoin } from 'tailwind-merge'
import { usePrivy } from '@privy-io/react-auth'

const CreateActivityButton = (): JSX.Element => {
  const router = useRouter()
  const { authenticated } = usePrivy()

  return (
    <Button
      type="button"
      className={twJoin(
        'mx-auto mt-4 flex w-max items-center justify-center rounded-full bg-black px-4 py-2',
        authenticated ? 'cursor-pointer' : 'cursor-not-allowed'
      )}
      disabled={!authenticated}
      onClick={() => {
        router.push('create-activity')
      }}
    >
      <Paragraph as="p5" className="whitespace-nowrap font-abc text-white">
        {!authenticated ? 'Login for new activity' : 'New activity'}
      </Paragraph>
    </Button>
  )
}

export default CreateActivityButton
