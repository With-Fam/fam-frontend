// Local Components
import { QuestionMark } from '@/components/icons'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const PlaceBid = (): JSX.Element => (
  <>
    <div className="mx-auto mb-4 mt-5 flex h-14 w-full max-w-2xl items-center gap-2 rounded-lg bg-grey-light px-4 py-2">
      <input
        className="flex-1 bg-transparent outline-0"
        type="text"
        name="bid-community"
        id="bid-community"
        placeholder="0.05 ETH or more"
      />
      <QuestionMark />
    </div>
    <button
      type="button"
      className="mx-auto mb-10 block w-full rounded-full bg-black py-4 text-white md:max-w-xs"
    >
      Place Bid
    </button>
  </>
)

export default PlaceBid
