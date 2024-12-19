import { NextResponse } from 'next/server'
import { CHAIN_ID } from '@/constants/defaultChains'
import stack from '@/lib/stack/client'
import { Address } from 'viem'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { title, description, proposalId, partyAddress, txHash } =
      await request.json()

    await stack.track('new_proposal', {
      points: 1,
      account: partyAddress as Address,
      uniqueId: `${CHAIN_ID}-${partyAddress}-${proposalId}`,
      metadata: {
        title,
        description,
        proposalId,
        txHash,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to track new proposal:', error)
    return NextResponse.json(
      { error: 'Failed to track proposal' },
      { status: 500 }
    )
  }
}
