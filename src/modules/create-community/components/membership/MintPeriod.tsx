import { TextInput } from '@/components/forms'

const MintPeriod = () => {
  return (
    <div className="relative z-0 mt-4">
      <TextInput
        name="mintPeriod"
        type="number"
        step="1"
        label="Mint Period"
        placeholder="5"
        labelIcon="helpCircle"
        tooltip="Once the mint period finishes your community can start voting. You can propose additional membership mints in the future"
      />
      <div className="absolute right-3 top-8 flex h-10 items-center gap-1 rounded-full border bg-grey-light px-4">
        <p className="text-md font-abcMedium text-black">Days</p>
      </div>
    </div>
  )
}
export default MintPeriod
