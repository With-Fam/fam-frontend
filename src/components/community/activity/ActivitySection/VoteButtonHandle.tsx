'use client'

// Framework
import { useState, useEffect } from 'react'
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from 'next/navigation'
import {
  SendTransactionResult,
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions'

// Components
import { Button, Loading } from '@/components/shared'
import { Paragraph } from '@/stories'
import { CheckMark, Close } from '@/components/icons'
import RowButton from '@/components/community/activity/ActivitySection/RowButton'
import { useDaoStore } from '@/modules/dao'
// ABI
import { governorAbi } from '@/data/contract/abis'

// Types
import { CHAIN_ID } from '@/types'
type BytesType = `0x${string}`
type VoteButtonHandleProps = {
  chainId: CHAIN_ID
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VoteButtonHandle = ({ chainId }: VoteButtonHandleProps): JSX.Element => {
  const { addresses } = useDaoStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSucess] = useState(false)
  const [isVoteYes, setIsVoteYes] = useState(true)
  const [comment, setComment] = useState('')
  const router = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { activityId } = useParams()

  const voting = searchParams.get('voting')
  const title = searchParams.get('title')
  const voteYes = searchParams.get('voteYes')
  const cleanParams = new URLSearchParams(Array.from(searchParams.entries()))
  cleanParams.delete('voting')
  cleanParams.delete('title')
  cleanParams.delete('voteYes')

  //fetch activityId from url using router

  // useEffect(() => {
  //   if (voteYes === 'false') {
  //     setIsVoteYes(false)
  //   }
  // }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        exitAndReset()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // useEffect(() => {
  //   if (isSubmitting) {
  //     setTimeout(() => {
  //       setIsSubmitting(false)
  //       setSubmitSucess(true)
  //     }, 2000)
  //   }
  // }, [isSubmitting])

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

    const value = isVoteYes ? '1' : '0'

    const governorContractParams = {
      address: addresses.governor,
      abi: governorAbi,
      chainId,
    }

    let vote: Promise<SendTransactionResult>
    if (comment?.length > 0) {
      console.log('WE HIT')
      const config = await prepareWriteContract({
        ...governorContractParams,
        functionName: 'castVoteWithReason',
        args: [activityId as BytesType, BigInt(value), comment],
      })
      vote = writeContract(config)
    } else {
      console.log('NO COMMENT HIT')
      const config = await prepareWriteContract({
        ...governorContractParams,
        functionName: 'castVote',
        args: [activityId as BytesType, BigInt(value)],
      })
      vote = writeContract(config)
    }

    const { hash } = await vote
    await waitForTransaction({ hash })

    // await mutate(
    //   [SWR_KEYS.PROPOSAL, chain.id, proposalId],
    //   getProposal(chain.id, proposalId)
    // )

    // setIsCastVoteSuccess(true)
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

export default VoteButtonHandle
