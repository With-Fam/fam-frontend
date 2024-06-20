import { TransactionType } from '@/modules/create-activity/types'
import { SendEth } from '@/modules/create-activity'
import { ZoraCollect } from '@/modules/create-activity/components/zora-collect'
import { ZoraCreate } from '@/modules/create-activity/components/zora-create'

export type ActionFormProps = {
  action: TransactionType
}

export function ActionForm({ action }: ActionFormProps): JSX.Element {
  switch (action) {
    case 'send-eth':
      return <SendEth />
    case 'zora-collect':
      return <ZoraCollect />
    case 'nft':
      return <ZoraCreate />
    default:
      return <div>Not found!</div>
  }
}
