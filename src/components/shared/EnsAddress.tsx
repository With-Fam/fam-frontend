import useEnsName from '@/hooks/useEnsName'
import truncateAddress from '@/utils/truncateAddress'

const EnsAddress = ({ address }: any) => {
  const { ensName } = useEnsName(address)
  return <>{ensName || truncateAddress(address)}</>
}

export default EnsAddress