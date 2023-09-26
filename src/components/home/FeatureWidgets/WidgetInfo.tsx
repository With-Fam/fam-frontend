// Local Components
import Heading from '@/stories/Heading'
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const WidgetInfo = ({
  title,
  children,
}: {
  title: string
  children: string
}) => {
  return (
    <div>
      <Heading as="h5">{title}</Heading>
      <Paragraph as="p3" className="pb-6 pt-2 text-grey">
        {children}
      </Paragraph>
    </div>
  )
}

export default WidgetInfo
