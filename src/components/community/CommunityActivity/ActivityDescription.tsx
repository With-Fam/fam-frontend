// Local Components
import { LinearGradient } from '@/components/icons'
import { Paragraph } from '@/stories'
import { Fragment } from 'react'

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
        <div className='external-content'>
          {children.split('\\n').map((paragraph, index) => (
            <div key={index} className="mb-2">
              <div dangerouslySetInnerHTML={{ __html: paragraph }} />
            </div>
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
