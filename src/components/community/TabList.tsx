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
    <div className="relative my-4 flex justify-around gap-1 px-4 sm:my-10 md:mx-auto md:max-w-[936px] md:gap-2 md:px-0">
      {items.map(({ id, ..._i }) => (
        <TabButton key={id} id={id} {..._i} />
      ))}
    </div>
  )
}

export default TabList
