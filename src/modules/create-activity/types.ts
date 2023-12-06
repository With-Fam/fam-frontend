export enum TransactionType {
  NFT = 'nft',
  SEND_ETH = 'send-eth',
  CROWD_FUND = 'crowd-fund',
  AIRDROP = 'airdrop',
  CUSTOM = 'custom',
  UPDATE_SETTINGS = 'update-community',
  // UPDATE_MINTER = 'update-minter',
  REPLACE_ARTWORK = 'replace-artwork',
}

export interface TransactionTypeProps {
  title: string
  subTitle: string
  icon: string
}

export interface TransactionTypesPropsMap
  extends Record<TransactionType, TransactionTypeProps> {}

export const TRANSACTION_TYPES = {
  [TransactionType.NFT]: {
    title: 'Create an NFT',
    subTitle:
      'Mint a song, album or video and split the proceeds with your fam',
    icon: 'collection',
  },
  [TransactionType.SEND_ETH]: {
    title: 'Send funds',
    subTitle: 'Send ETH to any address',
    icon: 'eth',
  },
  [TransactionType.AIRDROP]: {
    title: 'Gift a membership',
    subTitle: 'Airdrop a membership to any address',
    icon: 'airdrop',
  },
  [TransactionType.UPDATE_SETTINGS]: {
    title: 'Update settings',
    subTitle: 'Edit your community settings',
    icon: 'plus',
  },
  [TransactionType.REPLACE_ARTWORK]: {
    title: 'Change artwork',
    subTitle: 'Update the artwork for your memberships',
    icon: 'brush',
  },
  [TransactionType.CUSTOM]: {
    title: 'Execute custom on chain functions',
    subTitle:
      'Perform other functions that are available on the current contract',
    icon: 'plus',
  },
} as TransactionTypesPropsMap
