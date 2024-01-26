'use client'

// Frameworks
import { MutableRefObject } from 'react'

// Hooks
import { useProposalStore } from '@/modules/create-activity/stores'

// Components
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'
import { Maybe } from '@/types'

type SubmitProposalProps = {
  formRef: MutableRefObject<Maybe<HTMLFormElement>>
  loading: boolean
  setLoadingMessage: (message: string) => void
  setLoading: (loading: boolean) => void
}

/*--------------------------------------------------------------------*/
export function SubmitProposal({
  formRef,
  loading,
  setLoading,
  setLoadingMessage,
}: SubmitProposalProps): Maybe<JSX.Element> {
  const { transactions } = useProposalStore()

  console.log('transactions::', transactions)

  return (
    <Button
      className="px-4 py-2"
      type="button"
      onClick={() => {
        setLoading(true)
        setLoadingMessage('Posting proposal')
        formRef?.current?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }}
      disabled={transactions?.length === 0}
    >
      <Paragraph as="p5" className="h-4 p-0">
      Post
      </Paragraph>
    </Button>
  )
}
