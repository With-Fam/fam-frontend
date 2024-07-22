import { CHAIN_ID } from '@/constants/defaultChains'
import { PARTY_APP_ENDPOINT } from '@/constants/party'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const addresses = request.nextUrl.searchParams.get('addresses') as string

  const response = await fetch(`${PARTY_APP_ENDPOINT[CHAIN_ID]}/api/avatars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ addresses: JSON.parse(addresses) }),
  })

  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
