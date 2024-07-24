import { CHAIN_ID } from '@/constants/defaultChains'
import { PARTY_APP_ENDPOINT } from '@/constants/party'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userAddress = request.nextUrl.searchParams.get('userAddress') as string

  const response = await fetch(
    `${PARTY_APP_ENDPOINT[CHAIN_ID]}/api/user/activity?userAddress=${userAddress}`
  )
  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
