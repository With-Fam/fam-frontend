'use client'

// Framework
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
  useRef,
  type PropsWithChildren,
} from 'react'
import dynamic from 'next/dynamic'

// Components
import { ErrorBox, Loading } from '@/components/shared'
import { CreateContextNavigation } from '../CreateContextNavigation'

const ActionForm = dynamic(
  () =>
    import('@/modules/create-activity/components/ActionForm').then(
      ({ ActionForm }) => ActionForm
    ),
  { ssr: false }
)
const ActionSection = dynamic(
  () =>
    import(
      '@/modules/create-activity/components/action/ActionSection/ActionSection'
    ).then(({ ActionSection }) => ActionSection),
  { ssr: false }
)
const ReviewProposalForm = dynamic(
  () =>
    import(
      '@/modules/create-activity/components/review-proposal/ReviewProposalForm'
    ).then(({ ReviewProposalForm }) => ReviewProposalForm),
  { ssr: false }
)
const SubmitProposal = dynamic(
  () =>
    import('@/modules/create-activity/components/action/SubmitProposal').then(
      ({ SubmitProposal }) => SubmitProposal
    ),
  { ssr: false }
)

// Helpers
import { useActivityFormStore } from '@/modules/create-activity/stores'
import {
  TRANSACTION_TYPES,
  type TransactionType,
} from '@/modules/create-activity/types'
let sections: CreateSection[] = []

// Types
import type { CreateSection } from '@/modules/create-community/types'
import type { AddressType, Maybe } from '@/types'
import { usePrivy } from '@privy-io/react-auth'
type ActivityProviderProps = PropsWithChildren<{
  params: {
    community: string
    network: string
  }
}>
export interface CreateActivityContextType {
  loading: boolean
  section: CreateSection
  step: number
  next: () => void
  prev: () => void
  title: string
}

const CreateActivityContext = createContext<CreateActivityContextType>({
  loading: false,
  section: { order: -1, title: '', key: '', content: <></> },
  step: 0,
  next: () => null,
  prev: () => null,
  title: '',
})

/*--------------------------------------------------------------------*/

const CreateActivityProvider = ({
  children,
  params,
}: ActivityProviderProps): JSX.Element => {
  const { authenticated, ready } = usePrivy()
  const { network, community } = params
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] =
    useState<string>('Setting the vibes')
  const reviewFormRef = useRef<Maybe<HTMLFormElement>>(null)
  const {
    activeSection,
    setActiveSection,
    setFulfilledSections,
    proposal: proposalDefault,
    activityType,
    setActivityType,
  } = useActivityFormStore()

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (loadingMessage === 'Proposal posted. Redirecting...') {
      setLoadingMessage('Setting the vibes')
      window.location.href = `/community/${network}/${community}/activity`
    }
  }, [loadingMessage])

  const navigate = useCallback(
    (a: number) => {
      if (a > activeSection) {
        setFulfilledSections(sections[activeSection].key)
      }
      setActiveSection(a)
    },
    [activeSection, setActiveSection, setFulfilledSections]
  )

  const next = useCallback(() => {
    navigate(activeSection + 1)
  }, [activeSection, navigate])

  const prev = useCallback(() => {
    navigate(activeSection - 1)
  }, [navigate, activeSection])

  sections = useMemo(() => {
    const actionSubmit = (a: TransactionType) => {
      setActivityType(a)
      next()
    }

    const action: CreateSection = {
      order: 0,
      title: 'All actions',
      key: 'action',
      content: <ActionSection onClick={actionSubmit as any} />,
    }

    const activityTransaction =
      TRANSACTION_TYPES[activityType as TransactionType]

    const transaction: CreateSection = {
      order: 1,
      title: activityTransaction?.title ?? '',
      key: activityType as string,
      content: (
        <ActionForm
          callback={next}
          action={activityType as TransactionType}
          collectionAddress={community as AddressType}
        />
      ),
    }

    const proposal: CreateSection = {
      action: (
        <SubmitProposal
          formRef={reviewFormRef}
          loading={loading}
          setLoadingMessage={setLoadingMessage}
          setLoading={setLoading}
        />
      ),
      order: 2,
      title: 'New activity',
      key: 'proposal',
      content: (
        <ReviewProposalForm
          formRef={reviewFormRef}
          community={community as AddressType}
          defaultValues={proposalDefault}
          setLoading={setLoading}
          setLoadingMessage={setLoadingMessage}
        />
      ),
    }
    return [action, transaction, proposal]
  }, [proposalDefault, activityType, community, next, setActivityType])

  if (!authenticated && ready) {
    return (
      <CreateActivityContext.Provider
        value={{
          loading,
          step: activeSection,
          section: sections[activeSection],
          next,
          prev,
          title: sections[activeSection]?.title,
        }}
      >
        <ErrorBox
          title="Not this time"
          description="You are not authenticated"
          exitPath="/"
        />
      </CreateActivityContext.Provider>
    )
  }

  return (
    <CreateActivityContext.Provider
      value={{
        loading,
        step: activeSection,
        section: sections[activeSection],
        next,
        prev,
        title: sections[activeSection]?.title,
      }}
    >
      {loading ? (
        <Loading
          title={loadingMessage}
          description="Put your feet up and enjoy the tunes"
        />
      ) : (
        <>
          <CreateContextNavigation
            action={sections[activeSection]?.action}
            // exitPath={`/community/${network}/${community}/activity`}
            step={activeSection}
            prev={prev}
            title={sections[activeSection]?.title}
          />
          {children}
        </>
      )}
    </CreateActivityContext.Provider>
  )
}

const useCreateActivityContext = (): CreateActivityContextType =>
  useContext(CreateActivityContext)

export {
  CreateActivityContext,
  CreateActivityProvider,
  useCreateActivityContext,
}
