import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const party = request.nextUrl.searchParams.get('party') as string
  const proposalId = request.nextUrl.searchParams.get('proposalId') as string

  const response = await fetch(
    `https://base-sepolia.party.app/api/signed_message?partyAddress=${party}&signedMessageVariant=comment&commentType=proposal&subjectIds=${proposalId}`
  )
  const data = await response.json()

  return NextResponse.json(
    {
      ...data,
    },
    { status: 200 }
  )
}
