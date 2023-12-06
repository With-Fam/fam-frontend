// Local Components
import { Paragraph } from '@/stories'

// Types
interface PhaseNameProps {
  children: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PhaseName = ({ children }: PhaseNameProps): JSX.Element => (
  <Paragraph
    as="p3"
    className="capitalize-first text-center font-abc text-lg font-normal text-orange"
  >
    {children}
  </Paragraph>
)

export default PhaseName
