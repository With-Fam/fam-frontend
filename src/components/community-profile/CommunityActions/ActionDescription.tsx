// Local Components
import { Paragraph } from '@/stories'
import { LinearGradient } from '@/components/icons'

// Types
interface DescriptionProps {
  children: React.ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActionDescription = ({ children }: DescriptionProps): JSX.Element => {
  return (
    <div className="relative z-0 mb-3 mt-4 hidden w-full sm:block">
      <Paragraph as="p4" className="max-h-16 overflow-y-scroll pb-12">
        {children}
      </Paragraph>
      <div className="absolute bottom-0 left-0 h-auto w-full">
        <LinearGradient />
      </div>
    </div>
  )
}

export default ActionDescription
