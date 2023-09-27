'use client'

// Local Components
import ToggleButton from '@/components/explore/Toggle/ToggleButton'

// Types
interface ToggleProps {
  type: string
}

// Content
import TOGGLE_DATA from '@/content/explore/toggle'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Toggle = ({ type = 'trending' }: ToggleProps): JSX.Element => {
  return (
    <section className="mx-auto my-4 block w-max bg-background px-4 sm:my-10">
      {TOGGLE_DATA.map((item, index) => {
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
