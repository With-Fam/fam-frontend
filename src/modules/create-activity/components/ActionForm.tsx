import { TransactionType } from '@/modules/create-activity/types'

import {
  Airdrop,
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
    case 'airdrop':
      return <Airdrop callback={callback} />
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
