import { Icon } from '@/components/Icon'

const VotedLabel = () => (
  <div className="flex items-center gap-1 rounded-full bg-black bg-green-light px-6 py-3 text-[20px] text-green">
    <Icon id="check" fill="#45D039" />
    Voted
  </div>
)

export default VotedLabel
