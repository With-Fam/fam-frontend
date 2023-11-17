// Local Components
import { LinearGradient } from '@/components/icons'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityDescription = ({ children }: { children: string }): JSX.Element => (
  <div className="relative z-0 mb-3 mt-4 hidden w-full sm:block">
    <div className="max-h-16 overflow-y-scroll pb-12">
      <span
        className="editor-content"
        dangerouslySetInnerHTML={{ __html: children }} // WARNING: This neeeds to be cleaned here and before saved!
      />
    </div>
    <div className="absolute bottom-0 left-0 h-auto w-full">
      <LinearGradient />
    </div>
  </div>
)

export default ActivityDescription
