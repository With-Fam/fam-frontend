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

// Components
import { Loading } from '@/components/shared'
import { CreateContextNavigation } from '../CreateContextNavigation'
import {
  ActionForm,
  ActionSection,
  ReviewProposalForm,
  SubmitProposal,
} from '@/modules/create-activity/components'

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
type ActivityProviderProps = PropsWithChildren<{
  params: {
    communityId: string
    networkId: string
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
  const { networkId, communityId } = params
  const [loading, setLoading] = useState<boolean>(true)
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
    if(loadingMessage === 'Proposal posted. Redirecting...') {
      setLoadingMessage('Setting the vibes')
      window.location.href = `/community/${networkId}/${communityId}/activity`
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
          collectionAddress={communityId as AddressType}
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
          defaultValues={proposalDefault}
          setLoading={setLoading}
          setLoadingMessage={setLoadingMessage}
        />
      ),
    }
    return [action, transaction, proposal]
  }, [proposalDefault, activityType, communityId, next, setActivityType])

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
            exitPath={`/community/${networkId}/${communityId}/activity`}
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
