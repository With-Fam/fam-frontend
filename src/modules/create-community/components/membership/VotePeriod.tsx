import { Icon } from '@/components/Icon'
import { useFormStore } from '@/modules/create-community/stores'
import Tooltip from '@/components/shared/Tooltip'
import VotePeriodButton from '@/modules/create-community/components/membership/VotePeriodButton'

const VotePeriod = () => {
  const { votePeriod, setVotePeriod } = useFormStore()

  return (
    <section className="mt-4 rounded-md bg-white pb-3">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Vote Period{' '}
        <Tooltip
          id={'revenue-split-tooltip'}
          message="This is the period between a vote passing and the action being completed onchain. This can be skipped if all founders accept"
          className="!z-[100]"
        >
          <Icon id="helpCircle" fill="#ffffff" />
        </Tooltip>
      </div>
      <div className="mt-4 flex grid w-full grid-cols-3 gap-2 px-4 md:gap-8">
        <VotePeriodButton
          isActive={votePeriod === 8 * 3600}
          label="8H"
          onClick={() => setVotePeriod(8 * 3600)}
        />
        <VotePeriodButton
          isActive={votePeriod === 24 * 3600}
          label="24H"
          onClick={() => setVotePeriod(24 * 3600)}
        />
        <VotePeriodButton
          isActive={votePeriod === 7 * 24 * 3600}
          label="7D"
          onClick={() => setVotePeriod(7 * 24 * 3600)}
        />
      </div>
    </section>
  )
}

export default VotePeriod
