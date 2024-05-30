// Framework
import { PropsWithChildren } from 'react'

// Types
import TabButton, { type TabButtonProps } from './TabButton'
type TabProviderProps = PropsWithChildren<{
  items: TabButtonProps[]
}>

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const TabList = ({ items }: TabProviderProps): JSX.Element => {
  return (
    <div className="relative mx-auto my-4 flex max-w-[936px] justify-around gap-2 sm:my-10">
      {items.map(({ id, ..._i }) => (
        <TabButton key={id} id={id} {..._i} />
      ))}
    </div>
  )
}

export default TabList
