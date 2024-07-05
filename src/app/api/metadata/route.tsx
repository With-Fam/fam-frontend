import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get('uri') as string
  const ipfsLink = getPartyDaoIpfsLink(uri)
  const response = await fetch(ipfsLink)
  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
