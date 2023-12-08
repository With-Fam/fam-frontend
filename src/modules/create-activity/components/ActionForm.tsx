import { TransactionType } from '@/modules/create-activity/types'

import {
  Crowdfund,
  SendEth,
  UpdateCommunityForm,
  CreateNFT,
} from '@/modules/create-activity'
import { AddressType } from '@/types'

export type ActionFormProps = {
  action: TransactionType
  callback: () => void
  collectionAddress: AddressType
}

export function ActionForm({
  action,
  callback,
  collectionAddress,
}: ActionFormProps): JSX.Element {
  switch (action) {
    case 'crowd-fund':
      return <Crowdfund callback={callback} />
    case 'send-eth':
      return <SendEth callback={callback} />
    case 'update-community':
      return (
        <UpdateCommunityForm
          callback={callback}
          collectionAddress={collectionAddress}
        />
      )
    case 'nft':
      return <CreateNFT callback={callback} />
    default:
      return <div>Not found!</div>
  }
}
