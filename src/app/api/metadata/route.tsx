import { ipfsGatewayUrl } from '@/lib/ipfs-service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const uri = request.nextUrl.searchParams.get('uri') as string
  const ipfsLink = ipfsGatewayUrl(uri) as any
  const response = await fetch(ipfsLink)
  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
