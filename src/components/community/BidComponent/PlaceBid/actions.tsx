import { getCommunityData } from '@/app/(main)/community/[networkId]/[communityId]/actions'
import { CHAIN_ID } from '@/types'

/**
 * Checks if bids are updated with a new bid within a specified time limit.
 * @param newBidId - The ID of the new bid.
 * @param chainId - The ID of the chain.
 * @param communityId - The ID of the community.
 * @param timeLimit - The time limit in milliseconds.
 * @returns A promise that resolves to a boolean indicating if bids are updated within the time limit.
 */
const checkIfBidsAreUpdated = async (
  newBidId: string,
  chainId: CHAIN_ID,
  communityId: string,
  timeLimit: number
): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const startTime = Date.now()

    const checkBids = async () => {
      const { bids } = await getCommunityData(
        chainId,
        communityId.toLowerCase()
      )
      const hasNewBid = bids.some((bid) => bid.id.includes(newBidId))

      if (hasNewBid) {
        resolve(true)
      } else if (Date.now() - startTime >= timeLimit) {
        resolve(false)
      } else {
        setTimeout(checkBids, 1000)
      }
    }

    checkBids()
  })
}

export { checkIfBidsAreUpdated }
