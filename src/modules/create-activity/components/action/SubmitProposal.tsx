'use client'

// Frameworks
import { MutableRefObject } from 'react'

// hooks
import { useProposalStore } from '@/modules/create-activity/stores'

// Components
import { Button } from '@/components/shared'
import { Paragraph } from '@/stories'
import { Maybe } from '@/types'

type Props = {
  formRef: MutableRefObject<Maybe<HTMLFormElement>>
}

export function SubmitProposal({ formRef }: Props): Maybe<JSX.Element> {
  const { transactions } = useProposalStore()

  console.log('transactions::', transactions)

  return (
    <Button
      className="px-4 py-2"
      type="button"
      onClick={() => {
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
