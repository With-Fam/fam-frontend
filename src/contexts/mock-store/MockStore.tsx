'use client'

// Framework
import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

// Content
import { COMMUNITY_ACTIONS_DATA } from '@/content/community/activity'

// Types
import { ActionsDataProps } from '@/types/create-community'
import { ActivityFormValues } from '@/types/create-activity'
interface MockStoreContextType {
  actions: ActionsDataProps[]
  setActions: Dispatch<SetStateAction<ActionsDataProps[]>>
  widgets: ActivityFormValues[]
  setWidgets: Dispatch<SetStateAction<ActivityFormValues[]>>
}

const MockStoreContext = createContext<MockStoreContextType>({
  actions: COMMUNITY_ACTIONS_DATA,
  setActions: () => null,
  widgets: [],
  setWidgets: () => null,
})

// IMPORTANT: Create loading component
const MockStoreProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [actions, setActions] = useState(COMMUNITY_ACTIONS_DATA)
  const [widgets, setWidgets] = useState<ActivityFormValues[]>([])

  return (
    <MockStoreContext.Provider
      value={{
        actions,
        setActions,
        widgets,
        setWidgets,
      }}
    >
      {children}
    </MockStoreContext.Provider>
  )
}

const useMockStoreContext = (): MockStoreContextType =>
  useContext(MockStoreContext)

export { MockStoreContext, MockStoreProvider, useMockStoreContext }
