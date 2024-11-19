import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const response = await fetch(
    `https://min-api-v2.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=${process.env.COINMARKETCAP_API_KEY}`
  )
  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
