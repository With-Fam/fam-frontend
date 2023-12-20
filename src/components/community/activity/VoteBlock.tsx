// Local Components
import { Paragraph } from '@/stories'
// Types
type VoteBlockProps = {
  votes: number
  direction: 'Yes' | 'No'
  rate: number
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const VoteBlock = ({ votes, direction, rate }: VoteBlockProps): JSX.Element => (
  <div className="flex-1 rounded-lg border border-solid border-grey-light px-4 py-5">
    <div className="mb-4 flex justify-between">
      <Paragraph
        as="p4"
        className={
          direction === 'Yes' ? 'text-status-green' : 'text-status-red'
        }
      >
        {direction}
      </Paragraph>
      <Paragraph as="p4" className="text-grey">
        {votes}
      </Paragraph>
    </div>
    <div className="h-2 w-full rounded-lg bg-grey-light">
      {direction === 'Yes' && rate > 0 && (
        <div
          className="h-2 w-full rounded-lg bg-status-green"
          style={{ width: `${rate * 100}%` }}
        />
      )}
      {direction === 'No' && rate > 0 && (
        <div
          className="h-2 w-full rounded-lg bg-status-red"
          style={{ width: `${rate * 100}%` }}
        />
      )}
    </div>
  </div>
)

export default VoteBlock
