import { formatEther } from 'viem'

const DEFAULT_MIN_BID_AMOUNT = 0.0001

export const useMinBidIncrement = ({
  highestBid,
  reservePrice,
  minBidIncrement,
}: {
  highestBid?: bigint
  reservePrice?: bigint
  minBidIncrement?: bigint
}): { minBidAmount: number } => {
  const bigHundred = BigInt(100)
  const bigZero = BigInt(0)

  if (
    reservePrice === undefined ||
    minBidIncrement === undefined ||
    // force default min bid amount given reserve price of 0 and no current bids
    (reservePrice === bigZero && highestBid === bigZero)
  ) {
    return {
      minBidAmount: DEFAULT_MIN_BID_AMOUNT,
    }
  }

  if (!highestBid || highestBid === bigZero) {
    return {
      minBidAmount: Number(formatEther(reservePrice)),
    }
  }

  const minBidRawAmount =
    (BigInt(highestBid) * BigInt(minBidIncrement)) / bigHundred +
    BigInt(highestBid)
  const minBidFormattedAmount = Number(formatEther(minBidRawAmount))

  return {
    minBidAmount: minBidFormattedAmount,
  }
}
