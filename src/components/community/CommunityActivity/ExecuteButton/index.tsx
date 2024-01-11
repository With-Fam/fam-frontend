// Third Parties
import { type Address} from 'wagmi'

// Helpers
import { BytesType } from '@/types'

// Components
import ExecuteManagement from '@/components/community/CommunityActivity/ExecuteButton/ExecuteManagement'

// Types
type ExecuteButtonProps = {
  proposalId: string
  onSuccess: () => void
  proposer: Address
  descriptionHash: BytesType
  calldatas: BytesType[]
  targets: Address[]
  values: bigint[]
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ExecuteButton = ({
  proposer,
  descriptionHash,
  calldatas,
  targets,
  values,
  ...props
}: ExecuteButtonProps): JSX.Element => {
  return (
    <ExecuteManagement
      functionName="execute"
      args={[targets, values, calldatas, descriptionHash, proposer]}
      buttonText="Execute"
      {...props}
    />
  )
}

export default ExecuteButton
