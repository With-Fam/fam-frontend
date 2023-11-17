// Local Components
import Heading from '@/stories/Heading'
import Paragraph from '@/stories/Paragraph'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

interface Props {
  title: string
  children: string
}

const WidgetInfo = ({ title, children }: Props): JSX.Element => (
  <div>
    <Heading as="h5">{title}</Heading>
    <Paragraph as="p3" className="pb-6 pt-2 text-grey">
      {children}
    </Paragraph>
  </div>
)

export default WidgetInfo
