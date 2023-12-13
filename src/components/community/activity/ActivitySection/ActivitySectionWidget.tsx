// Framework
import Image from 'next/image'

// Local Components
import { Paragraph } from '@/stories'

// Context
import { ActivityFormValues } from '@/types/create-activity'

// Types
type ActivitySectionWidgetProps = {
  widget: ActivityFormValues
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySectionWidget = ({
  widget,
}: ActivitySectionWidgetProps): JSX.Element => {
  return (
    <div className="box-content w-full sm:w-[322px]">
      <div className="relative flex gap-4 rounded-2xl bg-white p-4">
        <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-grey-light">
          {widget.image && (
            <Image
              src={widget.image}
              fill
              className="rounded-md object-cover"
              alt=""
            />
          )}
        </div>
        <div className="text-left">
          <Paragraph as="p3" className="mb-2">
            {widget.title}
          </Paragraph>
          <Paragraph as="p5" className="text-grey">
            {widget['action-title']}
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default ActivitySectionWidget
