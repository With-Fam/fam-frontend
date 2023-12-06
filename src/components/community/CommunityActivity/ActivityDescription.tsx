// Local Components
import { LinearGradient } from '@/components/icons'
import { Paragraph } from '@/stories'

// Types
type ActivityDescriptionProps = {
  children: string | null | undefined
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityDescription = ({
  children,
}: ActivityDescriptionProps): JSX.Element => (
  <div className="relative z-0 mb-3 mt-4 hidden w-full sm:block">
    <div className="max-h-16 overflow-y-scroll pb-12">
      {typeof children === 'string' && (
        <div>
          {children.split('\\n').map((paragraph, index) => (
            <Paragraph key={index} as="p4" className="mb-2">
              {paragraph}
            </Paragraph>
          ))}
        </div>
      )}
    </div>
    <div className="absolute bottom-0 left-0 h-auto w-full">
      <LinearGradient />
    </div>
  </div>
)

export default ActivityDescription
