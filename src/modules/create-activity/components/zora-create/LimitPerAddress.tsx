import { TextInput } from '@/components/forms'
import SelectButton from '@/modules/create-activity/components/zora-create/SelectButton'
import { LIMIT, useProposalStore } from '@/modules/create-activity/stores'
import { useEffect } from 'react'

const LimitPerAddress = ({ duration }: any) => {
  const { limitPerAddress, setLimitPerAddress } = useProposalStore()

  useEffect(() => {
    if (duration === 90) setLimitPerAddress(LIMIT.UNLIMITED)
  }, [duration])

  return (
    <section className="mt-4 rounded-md bg-white pb-3">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Limit per address{' '}
      </div>
      <div className="mt-4 flex grid w-full grid-cols-2 gap-2 px-4 md:gap-8">
        <SelectButton
          isActive={limitPerAddress === LIMIT.UNLIMITED}
          label="Unlimited"
          onClick={() => setLimitPerAddress(LIMIT.UNLIMITED)}
        />
        <SelectButton
          isActive={limitPerAddress === LIMIT.CUSTOM}
          label="Custom"
          onClick={() => {
            if (duration === 90) return
            setLimitPerAddress(LIMIT.CUSTOM)
          }}
        />
        {limitPerAddress === LIMIT.CUSTOM && (
          <TextInput
            name="customLimit"
            placeholder="Custom Limit Per Address"
            label="Custom Limit"
            type="number"
            step="1"
            min={1}
          />
        )}
      </div>
    </section>
  )
}

export default LimitPerAddress
