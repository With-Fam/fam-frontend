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
import { TRANSACTION_TYPES, TransactionType } from '@/modules/create-activity/types'
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
  }
}>

// IMPORTANT: Create loading component
const CreateActivityProvider = ({ children, params }: Props): JSX.Element => {
  const { communityId } = params
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

    const actionSubmit = (a: string) => {
      setActivityType(a)
      navigate(2)
    }

    const action: CreateSection = {
      order: 1,
      title: 'All actions',
      key: 'action',
      content: <ActionSection onClick={actionSubmit} />,
    }

    const transaction = TRANSACTION_TYPES[activityType as TransactionType]

    const nft: CreateSection = {
      order: 2,
      title: transaction?.title ?? '',
      key: activityType,
      content: (
        <ActionForm
          action={activityType as TransactionType}
          collectionAddress={communityId as AddressType}
        />
      ),
    }
    return [general, action, nft]
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
      <CreateContextNavigation
        exitPath={`/community/${communityId}`}
        step={activeSection}
        prev={prev}
        title={sections[activeSection]?.title}
      />
      {loading ? (
        <Loading
          title="Setting the vibes"
          description="Put your feet up and enjoy the tunes"
        />
      ) : (
        children
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
