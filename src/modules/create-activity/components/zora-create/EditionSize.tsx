import { TextInput } from '@/components/forms'
import SelectButton from '@/modules/create-activity/components/zora-create/SelectButton'
import { EDITON_SIZE, useProposalStore } from '@/modules/create-activity/stores'
import { maxUint64 } from 'viem'

const EditionSize = () => {
  const { editionSize, setEditionSize } = useProposalStore()

  return (
    <section className="mt-4 rounded-md bg-white pb-3">
      <div className="flex items-center gap-1 px-4 pt-4 text-left font-abcMedium text-sm">
        Edition size{' '}
      </div>
      <div className="mt-4 flex grid w-full grid-cols-3 gap-2 px-4 md:gap-8">
        <SelectButton
          isActive={editionSize === EDITON_SIZE.OPEN}
          label="Open"
          onClick={() => setEditionSize(EDITON_SIZE.OPEN)}
        />
        <SelectButton
          isActive={editionSize === EDITON_SIZE.ONEOFONE}
          label="1 of 1"
          onClick={() => setEditionSize(EDITON_SIZE.ONEOFONE)}
        />
        <SelectButton
          isActive={editionSize === EDITON_SIZE.FIXED}
          label="Fixed"
          onClick={() => setEditionSize(EDITON_SIZE.FIXED)}
        />
        {editionSize === EDITON_SIZE.FIXED && (
          <TextInput
            name="customEditionSize"
            placeholder="Fixed Edition Size"
            label="Fixed Size"
            type="number"
            step="1"
            max={maxUint64.toString()}
            min={1}
          />
        )}
      </div>
    </section>
  )
}

export default EditionSize
