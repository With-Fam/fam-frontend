import SelectButton from '@/modules/create-activity/components/zora-create/SelectButton'
import { EDITON_SIZE, useProposalStore } from '@/modules/create-activity/stores'

const LimitPerAddress = () => {
  const { limitPerAddress, setLimitPerAddress } = useProposalStore()

  return (
    <section className="mt-4 rounded-md bg-white pb-3">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Edition size{' '}
      </div>
      <div className="mt-4 flex grid w-full grid-cols-2 gap-2 px-4 md:gap-8">
        <SelectButton
          isActive={limitPerAddress === EDITON_SIZE.OPEN}
          label="Unlimited"
          onClick={() => setLimitPerAddress(EDITON_SIZE.OPEN)}
        />
        <SelectButton
          isActive={limitPerAddress === EDITON_SIZE.ONEOFONE}
          label="Custom"
          onClick={() => setLimitPerAddress(EDITON_SIZE.ONEOFONE)}
        />
      </div>
    </section>
  )
}

export default LimitPerAddress
