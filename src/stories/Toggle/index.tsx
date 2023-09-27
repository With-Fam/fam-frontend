'use client'

// Local Components
import ToggleButton from '@/stories/Toggle/ToggleButton'

// Types
interface ToggleProps {
  type: string
  center?: boolean
  defaultType?: string
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

const Toggle = ({
  type,
  items,
  center = false,
  defaultType,
}: ToggleProps): JSX.Element => {
  return (
    <section
      className={`
      my-4 block w-max sm:my-10
      ${center ? 'mx-auto' : 'mx-0 sm:mx-auto'}
    `}
    >
      {items.map((item, index) => {
        const { title, href, id } = item
        const resultType = type || defaultType
        return (
          <ToggleButton key={index} href={href} active={resultType === id}>
            {title}
          </ToggleButton>
        )
      })}
    </section>
  )
}
export default Toggle
