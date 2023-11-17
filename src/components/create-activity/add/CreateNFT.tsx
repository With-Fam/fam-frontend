// Local Components
import { AddActionButton, InputSlider } from '@/components/create-activity'
import { Button, MediaUpload, PhaseName } from '@/components/shared'
import { TextInput } from '@/components/forms'
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Componennt
 */

const CreateNFT = (): JSX.Element => (
  <>
    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
      <PhaseName>Create NFT</PhaseName>
    </div>
    <div className="mx-auto max-w-[668px]">
      <div className="flex justify-center gap-2">
        <div className="flex justify-center">
          <Button type="button" variant="secondary" className="px-3 py-2">
            <Paragraph as="p5" className="">
              Limited Edition
            </Paragraph>
          </Button>
        </div>
        <div className="flex justify-center">
          <Button type="button" variant="tertiary" className="px-3 py-2">
            <Paragraph as="p5" className="">
              Open Edition
            </Paragraph>
          </Button>
        </div>
      </div>
      <div className="mb-4 mt-6">
        <MediaUpload formId="media-file" />
      </div>
      <div className="grid gap-2">
        <TextInput
          name="title"
          label="Title"
          placeholder="NFT's title"
          type="text"
        />
        <TextInput
          name="description"
          label="Description"
          placeholder="NFT's description"
          type="text"
        />
        <TextInput
          name="Symbol"
          label="Description"
          placeholder="$Symbol"
          type="text"
        />
      </div>
      <div className="mb-2 mt-4">
        <InputSlider />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          name="editions"
          label="No. of editions"
          defaultValue={10}
          type="number"
        />
        <TextInput
          name="price"
          label="Price per edition"
          placeholder="NFT's price"
          type="text"
        />
        <TextInput
          name="limit-address"
          label="Limit per address"
          defaultValue={1}
          type="text"
        />
        <TextInput
          name="royalty"
          label="Royalty"
          defaultValue={5}
          type="number"
        />
      </div>
      <div className="mt-4">
        <TextInput
          name="payout"
          label="Payout address"
          placeholder="payout address"
          type="text"
        />
      </div>
      <div className="flex w-full justify-center">
        <Button type="button" variant="secondary" className="mt-6 px-3 py-2">
          <Paragraph as="p5" className="">
            Create a split
          </Paragraph>
        </Button>
      </div>
      <div className="py-4">
        <TextInput
          name="admin-address"
          label="Admin address"
          placeholder="admin address"
          type="text"
        />
      </div>
      <AddActionButton activityId="88" watchStates={['title', 'description']} />
    </div>
  </>
)

export default CreateNFT
