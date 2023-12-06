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
    <div className="mx-auto my-4 flex gap-2 w-max sm:my-10">
      {items.map(({ id, ..._i }) => (
        <TabButton key={id} id={id} {..._i} />
      ))}
    </div>
  )
}

export default TabList
