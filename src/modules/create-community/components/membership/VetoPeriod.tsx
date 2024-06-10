import { Icon } from '@/components/Icon'
import { useFormStore } from '@/modules/create-community/stores'
import { Paragraph } from '@/stories'
import Tooltip from '@/components/shared/Tooltip'

const VetoPeriod = () => {
  const { vetoPeriod, setVetoPeriod } = useFormStore()

  return (
    <section className="mt-4 rounded-md bg-white">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Veto Period{' '}
        <Tooltip
          id={'revenue-split-tooltip'}
          message="This is the period between a vote passing and the action being completed onchain. This can be skipped if all founders accept"
          className="!z-[100]"
        >
          <Icon id="helpCircle" fill="#ffffff" />
        </Tooltip>
      </div>
      <div className="mt-4 flex grid w-full grid-cols-3 gap-2 px-4 md:gap-8">
        <button
          className={`text-abcMedium flex h-[100px] items-center justify-center rounded-2xl border ${vetoPeriod === 8 * 3600 ? 'border-orange' : ''}`}
          type="button"
          onClick={() => setVetoPeriod(8 * 3600)}
        >
          <Paragraph as="p3">8H</Paragraph>
        </button>
        <button
          className={`text-abcMedium flex h-[100px] items-center justify-center rounded-2xl border ${vetoPeriod === 24 * 3600 ? 'border-orange' : ''}`}
          type="button"
          onClick={() => setVetoPeriod(24 * 3600)}
        >
          <Paragraph as="p3">24H</Paragraph>
        </button>
        <button
          className={`text-abcMedium flex h-[100px] items-center justify-center rounded-2xl border ${vetoPeriod === 7 * 24 * 3600 ? 'border-orange' : ''}`}
          type="button"
          onClick={() => setVetoPeriod(7 * 24 * 3600)}
        >
          <Paragraph as="p3">7D</Paragraph>
        </button>
      </div>
    </section>
  )
}

export default VetoPeriod
