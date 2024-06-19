import { CHAIN_ID } from '@/constants/defaultChains'
import { PARTY_APP_ENDPOINT } from '@/constants/party'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const party = request.nextUrl.searchParams.get('party') as string
  const nextOffset = request.nextUrl.searchParams.get('nextOffset') as string

  const response = await fetch(
    `${PARTY_APP_ENDPOINT[CHAIN_ID]}/api/proposals?partyGovtAddress=${party}&proposalOffset=${nextOffset}`
  )
  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
