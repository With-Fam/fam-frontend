// Local Components
import { AddActionButton, CurrencyList } from '@/components/create-activity'
import { Button, PhaseName } from '@/components/shared'
import { TextInput } from '@/components/forms'
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Componennt
 */

const AddSendFunds = (): JSX.Element => (
  <>
    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
      <PhaseName>Send Funds</PhaseName>
    </div>
    <div className="mx-auto max-w-[668px]">
      <div className="flex flex-col gap-2">
        <div className="relative z-0">
          <TextInput
            name="funds-amount"
            label="Amount"
            type="number"
            defaultValue="1"
            className="block w-full text-lg outline-0"
          />
          <CurrencyList />
        </div>
        <TextInput
          name="funds-recipient"
          label="Recipient"
          type="text"
          placeholder="Reciepient's name"
          className="block w-full text-lg outline-0"
        />
      </div>
      <div className="flex w-full justify-center">
        <Button type="button" variant="secondary" className="mt-6 px-3 py-2">
          <Paragraph as="p5" className="">
            Add recipient
          </Paragraph>
        </Button>
      </div>
      <AddActionButton
        activityId="35"
        watchStates={['funds-amount', 'funds-recipient', 'currency']}
      />
    </div>
  </>
)

export default AddSendFunds
