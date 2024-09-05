import { toFunctionSelector } from 'viem'

export const DEPLOYMENT_ERROR = {
  MISSING_IPFS_ARTWORK: `Oops! It looks like your artwork wasn't correctly uploaded to ipfs. Please go back to the artwork step to re-upload your artwork before proceeding.`,
  MISMATCHING_SIGNER:
    'Oops! It looks like the founder address submitted is different than the current signer address. Please go back to the allocation step and re-submit the founder address.',
  NO_FOUNDER:
    'Oops! It looks like you have no founders set. Please go back to the allocation step and add at least one founder address.',
  GENERIC:
    'Oops! Looks like there was a problem handling the dao deployment. Please ensure that input data from all the previous steps is correct',
  INVALID_ALLOCATION_PERCENTAGE:
    'Oops! Looks like there are undefined founder allocation values. Please go back to the allocation step to ensure that valid allocation values are set.',
  MISMATCHING_NETWORK: 'Oops! Looks like there is a chain mismatch.',
}

export const MONTH_LABELS = [
  'January',
  'Feburuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const PARTY_PROPOSAL_ADD_MEMBER_CANCELDELAY = 3628800
export const PARTY_PROPOSAL_CANCELDELAY = 300
export const ZORA_CREATE_METHOD_ID = toFunctionSelector(
  'function createContract(string,string,(uint32,uint32,address),address,bytes[])'
)
