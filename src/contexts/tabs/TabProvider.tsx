'use client'

// Framework
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useState,
  useContext,
  SetStateAction,
} from 'react'

import { TabButton, type TabButtonItem } from './TabButton'

interface TabContextType {
  items: TabButtonItem[]
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}

const TabContext = createContext<TabContextType>({
  items: [],
  tab: '',
  setTab: () => false,
})

type TabProviderProps = PropsWithChildren<{
  center?: boolean
  items: TabButtonItem[]
}>

// IMPORTANT: Create loading component
const TabProvider = ({
  center = false,
  children,
  items,
}: TabProviderProps): JSX.Element => {
  const [tab, setTab] = useState<string>(items[0].id)

  return (
    <TabContext.Provider
      value={{
        tab,
        setTab,
        items,
      }}
    >
      <div
        className={`my-4 block w-max sm:my-10 ${
          center ? 'mx-auto' : 'mx-0 sm:mx-auto'
        }`}
      >
        {items.map(({ id, ..._i }) => (
          <TabButton
            key={id}
            id={id}
            active={id === tab}
            onChange={setTab}
            {..._i}
          />
        ))}
      </div>
      {children}
    </TabContext.Provider>
  )
}

const useTabContext = (): TabContextType => useContext(TabContext)

export { TabContext, TabProvider, useTabContext }
