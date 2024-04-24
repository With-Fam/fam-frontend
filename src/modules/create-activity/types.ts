export enum TransactionType {
  NFT = 'nft',
  MERCH = 'merch',
  SEND_ETH = 'send-eth',
  CROWD_FUND = 'crowd-fund',
  AIRDROP = 'airdrop',
  UPDATE_COMMUNITY = 'update-community',
  CUSTOM = 'custom',
  UPGRADE = 'upgrade',
  // REPLACE_ARTWORK = 'replace-artwork',
  UPDATE_MINTER = 'update-minter',
  MIGRATE_TO_PARTY = 'migrate-to-party',
}

export interface TransactionTypeProps {
  title: string
  subTitle: string
  image: string
}

export interface TransactionTypesPropsMap
  extends Record<TransactionType, TransactionTypeProps> {}

export const TRANSACTION_TYPES = {
  [TransactionType.NFT]: {
    title: 'Create NFT',
    subTitle:
      'Mint a song, album or video and split the proceeds with your fam',
    image: '/assets/images/create-activity/donut.jpg',
  },
  [TransactionType.MERCH]: {
    title: 'Merch drop',
    subTitle: 'Digi-physical merch collections for your fans',
    image: '/assets/images/create-activity/pyramid.jpg',
  },
  [TransactionType.SEND_ETH]: {
    title: 'Send funds',
    subTitle: 'Send ETH to any address',
    image: '/assets/images/create-activity/cylinder.jpg',
  },
  [TransactionType.CROWD_FUND]: {
    title: 'Start a crowdfund',
    subTitle: 'Fund your communities ideas and projects',
    image: '/assets/images/create-activity/spring.jpg',
  },
  [TransactionType.AIRDROP]: {
    title: 'Gift a membership',
    subTitle: 'Airdrop a membership to any address',
    image: '/assets/images/create-activity/cube.jpg',
  },
  [TransactionType.UPDATE_COMMUNITY]: {
    title: 'Update community',
    subTitle: 'Edit your settings and artwork',
    image: '/assets/images/create-activity/tube.jpg',
  },
  [TransactionType.MIGRATE_TO_PARTY]: {
    title: 'Migrate to party',
    subTitle: 'Propose migrate to party',
    image: '/assets/images/create-activity/pyramid.jpg',
  },
  // [TransactionType.REPLACE_ARTWORK]: {
  //   title: 'Change artwork',
  //   subTitle: 'Update the artwork for your memberships',
  //   image: '',
  // },
  // [TransactionType.CUSTOM]: {
  //   title: 'Execute custom on chain functions',
  //   subTitle:
  //     'Perform other functions that are available on the current contract',
  //   image: '/assets/images/create-activity/tube.jpg',
  // },
} as TransactionTypesPropsMap
