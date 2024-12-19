import { NextResponse } from 'next/server'
import stack from '@/lib/stack/client'
import { Address, getAddress } from 'viem'

export async function GET(
  request: Request,
  { params }: { params: { partyAddress: Address } }
): Promise<NextResponse> {
  try {
    const { partyAddress } = params
    console.log('partyAddress', partyAddress)
    const response = await stack.getEvents({
      query: stack
        .eventsQuery()
        .where({
          associatedAccount: getAddress(partyAddress),
        })
        .offset(0)
        .build(),
    })

    if (!response?.length) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Failed to fetch proposal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch proposal' },
      { status: 500 }
    )
  }
}
