import { useState } from 'react'

import { ReviewProposalForm } from '@/modules/create-activity/components/review-proposal'
import { ReviewProposalFormValues } from '@/modules/create-activity/components/review-proposal/schema'

const MigrateToPartyProposalForm = () => {
  const [migrateToPartyLoading, setMigrateToPartyLoading] =
    useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')

  const initialValues: ReviewProposalFormValues = {
    summary: '',
    title: '',
    // transactions: [],
  }

  return (
    <ReviewProposalForm
      defaultValues={initialValues}
      setLoadingMessage={setLoadingMessage}
      setLoading={setMigrateToPartyLoading}
    />
  )
}

export default MigrateToPartyProposalForm
