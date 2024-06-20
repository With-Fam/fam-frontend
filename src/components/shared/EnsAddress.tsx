import useEnsName from '@/hooks/useEnsName'
import truncateAddress from '@/lib/truncateAddress'

const EnsAddress = ({ address }: any) => {
  const { ensName } = useEnsName(address)
  return <>{ensName || truncateAddress(address)}</>
}

export default EnsAddress
