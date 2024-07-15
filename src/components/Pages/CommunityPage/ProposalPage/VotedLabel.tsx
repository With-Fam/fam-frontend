import { Icon } from '@/components/Icon'

const VotedLabel = () => (
  <div className="flex items-center gap-1 bg-green-light text-green">
    <Icon id="check" fill="#45D039" />
    Voted
  </div>
)

export default VotedLabel
