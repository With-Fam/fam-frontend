import { TransactionType } from "@/modules/create-activity/types"

import { Crowdfund, SendEth, UpdateCommunityForm, CreateNFT } from "@/modules/create-activity"
import { AddressType } from "@/types"

type ActionFormProps = {
  action: TransactionType
  collectionAddress: AddressType
}

export function ActionForm({
  action,
  collectionAddress
}: ActionFormProps): JSX.Element {
  switch (action) {
    case 'crowd-fund':
      return <Crowdfund onSubmit={(a) => console.log('Crowdfund::', a)} />
    case 'send-eth':
      return <SendEth />
    case 'update-community':
      return <UpdateCommunityForm collectionAddress={collectionAddress} />
    case 'nft':
      return <CreateNFT onSubmit={(a) => console.log('CreateNFT::', a)} />
    default:
      return <div>Not found!</div>
  }
}