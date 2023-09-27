'use client'

// Local Components
import ToggleButton from '@/stories/Toggle/ToggleButton'

// Types
interface ToggleProps {
  type: string
  items: {
    id: string
    title: string
    href: string
  }[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Toggle = ({ type = 'trending', items }: ToggleProps): JSX.Element => {
  return (
    <section className="mx-0 sm:mx-auto my-4 block w-max px-4 sm:my-10">
      {items.map((item, index) => {
        const { title, href, id } = item
        return (
          <ToggleButton key={index} href={href} active={type === id}>
            {title}
          </ToggleButton>
        )
      })}
    </section>
  )
}
export default Toggle
