'use client'

// Framework
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react'

import type { CreateSection } from '@/modules/create-community/types'

// Components
import { Loading } from '@/components/shared'
import { CreateContextNavigation } from '../CreateContextNavigation'

import { useActivityFormStore } from '@/modules/create-activity/stores'
import {
  ActionForm,
  ActionSection,
  GeneralForm,
} from '@/modules/create-activity/components'
import { GeneralActivityValues } from '@/modules/create-activity/components/general/schema'
import {
  TRANSACTION_TYPES,
  TransactionType,
} from '@/modules/create-activity/types'
import { AddressType } from '@/types'

export interface CreateActivityContextType {
  loading: boolean
  section: CreateSection
  step: number
  next: () => void
  prev: () => void
  title: string
}

let sections: CreateSection[] = []

const CreateActivityContext = createContext<CreateActivityContextType>({
  loading: false,
  section: { order: -1, title: '', key: '', content: <></> },
  step: 0,
  next: () => null,
  prev: () => null,
  title: '',
})

type Props = PropsWithChildren<{
  params: {
    communityId: string
    networkId: string
  }
}>

// IMPORTANT: Create loading component
const CreateActivityProvider = ({ children, params }: Props): JSX.Element => {
  const { networkId, communityId } = params
  const [loading, setLoading] = useState<boolean>(true)
  const {
    activeSection,
    setActiveSection,
    setFulfilledSections,
    general: generalDefault,
    setGeneral,
    activityType,
    setActivityType,
  } = useActivityFormStore(params)()

  useEffect(() => {
    setLoading(false)
  }, [])

  const navigate = useCallback(
    (a: number) => {
      if (a > activeSection) {
        setFulfilledSections(sections[activeSection].key)
      }
      setActiveSection(a)
    },
    [activeSection, setActiveSection, setFulfilledSections]
  )

  const next = () => {
    navigate(activeSection + 1)
  }
  const prev = () => {
    navigate(activeSection - 1)
  }

  sections = useMemo(() => {
    const generalSubmit = (a: GeneralActivityValues) => {
      setGeneral(a)
      navigate(1)
    }
    const general: CreateSection = {
      order: 0,
      title: 'New activity',
      key: 'general',
      content: (
        <GeneralForm defaultValues={generalDefault} onSubmit={generalSubmit} />
      ),
    }

    const actionSubmit = (a: TransactionType) => {
      setActivityType(a)
      navigate(2)
    }

    const action: CreateSection = {
      order: 1,
      title: 'All actions',
      key: 'action',
      content: <ActionSection onClick={actionSubmit as any} />,
    }

    const activityTransaction =
      TRANSACTION_TYPES[activityType as TransactionType]

    const transaction: CreateSection = {
      order: 2,
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
    return [general, action, transaction, general]
  }, [generalDefault, setGeneral, navigate])

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
          title="Setting the vibes"
          description="Put your feet up and enjoy the tunes"
        />
      ) : (
        <>
          <CreateContextNavigation
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
