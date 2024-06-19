import { CHAIN_ID } from '@/constants/defaultChains'
import { PARTY_APP_ENDPOINT } from '@/constants/party'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { party, proposalId, signerAddress, signedMessage, message } = body

    const payload = {
      method: 'create',
      signerAddress,
      message: {
        message,
        partyAddress: party,
        subjectId: proposalId.toString(),
      },
      signedMessage,
      partyAddress: party,
      subjectId: proposalId.toString(),
      commentType: 'proposal',
    }

    const response = await fetch(
      `${PARTY_APP_ENDPOINT[CHAIN_ID]}/api/signed_message?signedMessageVariant=comment`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    return NextResponse.json(
      {
        ...data,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
