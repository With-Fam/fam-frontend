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
  dynamicReference?: {
    [key: string]: string
  }
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
  dynamicReference,
}: ToggleProps): JSX.Element => {
  return (
    <section
      className={`my-4 block w-max sm:my-10 ${
        center ? 'mx-auto' : 'mx-0 sm:mx-auto'
      }`}
    >
      {items.map((item, index) => {
        const { title, href, id } = item
        const resultType = type || defaultType

        //Sometimes the toggle will have to consider dynamic routes
        let updatedHref = href
        if (dynamicReference) {
          if (Object.keys(dynamicReference).length > 0) {
            const dynamicKey = Object.keys(dynamicReference)[0]
            const dynamicValue = Object.values(dynamicReference)[0]
            updatedHref = href.replace(`[${dynamicKey}]`, dynamicValue)
          }
        }

        return (
          <ToggleButton
            key={index}
            href={updatedHref}
            active={resultType === id}
          >
            {title}
          </ToggleButton>
        )
      })}
    </section>
  )
}

export default Toggle
