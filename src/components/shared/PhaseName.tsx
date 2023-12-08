// Local Components
import { Paragraph } from '@/stories'
import { Maybe } from '@/types'

// Types
interface PhaseNameProps {
  children: Maybe<string>
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PhaseName = ({ children }: PhaseNameProps): JSX.Element => (
  <Paragraph
    as="p3"
    className="text-center font-abc text-lg font-normal text-orange capitalize-first"
  >
    {children}
  </Paragraph>
)

export default PhaseName
