'use client'

// Local Components
import { Paragraph } from '@/stories'
import { PhaseName } from '@/components/shared'
import { MembershipForm } from '@/modules/create-community/components'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const MembershipPhase = (): JSX.Element => (
  <div>
    <PhaseName>Membership</PhaseName>
    <Paragraph as="p4" className="mt-0 text-grey-dark sm:mt-10">
      What kind of community would you like to create?
    </Paragraph>
    <MembershipForm />
  </div>
)

export default MembershipPhase
