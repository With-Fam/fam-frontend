import { NextResponse } from 'next/server'
import getHypersubByOwner from '@/lib/hypersub/getHypersubByOwner'

export async function GET(
  request: Request,
  { searchParams }: { searchParams: { owner: string } }
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')

    if (!owner) {
      return NextResponse.json(
        { error: 'Owner address is required' },
        { status: 400 }
      )
    }

    const data = await getHypersubByOwner(owner)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch hypersub data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hypersub data' },
      { status: 500 }
    )
  }
}
