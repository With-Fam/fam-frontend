'use client'

// Framework
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

// Components
import { Button, Loading } from '@/components/shared'
import { Paragraph } from '@/stories'
import { CheckMark, Close } from '@/components/icons'
import RowButton from '@/components/community/activity/ActivitySection/RowButton'
import { useDaoStore } from '@/modules/dao'

import { CHAIN_ID } from '@/types'
type VoteButtonHandleProps = {
  chainId: CHAIN_ID
}

import useUserHitEscape from '@/hooks/useUserHitEscape'

const VoteButtonHandle = ({ chainId }: VoteButtonHandleProps): JSX.Element => {
  const { addresses } = useDaoStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSucess] = useState(false)
  const [isVoteYes, setIsVoteYes] = useState(true)
  const [comment, setComment] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const voting = searchParams.get('voting')
  const title = searchParams.get('title')
  const cleanParams = new URLSearchParams(Array.from(searchParams.entries()))
  cleanParams.delete('voting')
  cleanParams.delete('title')
  cleanParams.delete('voteYes')

  useUserHitEscape(() => exitAndReset())

  const exitAndReset = (reset?: boolean) => {
    router.push(`${pathname}?${cleanParams}`)
    if (reset) {
      setIsSubmitting(false)
      setSubmitSucess(false)
      setIsVoteYes(true)
    }
  }

  const handleSubmit = async () => {
    if (!addresses.governor) return
    setIsSubmitting(true)

    setIsSubmitting(false)
    setSubmitSucess(true)
  }

  return (
    <>
      {voting && (
        <>
          <div
            className="z-90 fixed inset-0 h-full w-full bg-black opacity-50 backdrop-blur-xl"
            aria-label="Exit"
            onClick={() => exitAndReset()}
          />
          <div className="fixed bottom-0 left-0 z-10 h-max w-full rounded-2xl bg-white p-4 md:inset-1/2 md:w-[343px] md:-translate-x-1/2 md:-translate-y-1/2">
            {isSubmitting && (
              <div className="h-full w-full">
                <Loading />
              </div>
            )}
            {!isSubmitting && !submitSuccess && (
              <>
                <button
                  aria-label="Close Vote"
                  className="cursor-point flex h-8 w-8 items-center justify-center rounded-full bg-background-icon"
                  onClick={() => exitAndReset()}
                >
                  <Close />
                </button>
                <div className="mt-3 text-center">
                  <Paragraph as="p3">
                    Voting on <span className="font-bold">{title}</span>
                  </Paragraph>
                </div>
                <textarea
                  name="comment"
                  id="comment"
                  placeholder="Add a comment"
                  onChange={(e: any) => {
                    e.preventDefault()
                    setComment(e.target.value)
                  }}
                  className="mt-6 h-full min-h-[115px] w-full resize-none rounded-xl bg-grey-light p-4 font-abc text-sm text-black outline-none placeholder:text-grey-dark"
                />
                <div className="mt-4 flex gap-2">
                  <RowButton
                    active={isVoteYes}
                    onClick={() => setIsVoteYes(true)}
                  >
                    Yes
                  </RowButton>
                  <RowButton
                    active={!isVoteYes}
                    onClick={() => setIsVoteYes(false)}
                  >
                    No
                  </RowButton>
                </div>
                <Button
                  type="button"
                  className="mt-4 w-full"
                  onClick={() => handleSubmit()}
                >
                  <Paragraph as="p3" className="text-white">
                    Submit
                  </Paragraph>
                </Button>
              </>
            )}
            {!isSubmitting && submitSuccess && (
              <div>
                <div className="flex justify-center">
                  <CheckMark className="h-16 w-16" />
                </div>
                <Paragraph as="p3" className="my-4 text-center">
                  Thank you for voting!
                </Paragraph>
                <Button
                  type="button"
                  className="mt-4 w-full"
                  onClick={() => exitAndReset(true)}
                >
                  <Paragraph as="p3" className="text-white">
                    Close
                  </Paragraph>
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

const SuspendedVetoButton = (_props: VoteButtonHandleProps) => (
  <Suspense>
    <VoteButtonHandle {..._props} />
  </Suspense>
)

export default SuspendedVetoButton
