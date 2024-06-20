'use client'

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
  type PropsWithChildren,
} from 'react'
import dynamic from 'next/dynamic'
import { ErrorBox, Loading } from '@/components/shared'
import { CreateContextNavigation } from '../CreateContextNavigation'
import { useActivityFormStore } from '@/modules/create-activity/stores'
import {
  TRANSACTION_TYPES,
  type TransactionType,
} from '@/modules/create-activity/types'
import type { CreateSection } from '@/modules/create-community/types'
import type { AddressType } from '@/types'
import { usePrivy } from '@privy-io/react-auth'
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

type ActivityProviderProps = PropsWithChildren<{
  params: {
    community: string
    network: string
  }
}>

let sections: CreateSection[] = []

const CreateActivityContext = createContext<any>(null)

const CreateActivityProvider = ({
  children,
  params,
}: ActivityProviderProps): JSX.Element => {
  const { authenticated, ready } = usePrivy()
  const { network, community } = params
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] =
    useState<string>('Setting the vibes')
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
      window.location.href = `/community/${network}/${community}`
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
      content: <ActionForm action={activityType as TransactionType} />,
    }
    return [action, transaction]
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
          setLoadingMessage,
          setLoading,
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
        setLoadingMessage,
        setLoading,
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

const useCreateActivityContext = () => useContext(CreateActivityContext)

export {
  CreateActivityContext,
  CreateActivityProvider,
  useCreateActivityContext,
}
