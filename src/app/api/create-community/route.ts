import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const { name, community_id, network } = body

    if (!name || !community_id || !network) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const id = uuidv4()

    const insertQuery = sql`
        INSERT INTO communities (id, name, community_id, enabled, featured, network)
        VALUES (${id}, ${name}, ${community_id}, true, false, ${network} );
      `

    await insertQuery

    return NextResponse.json({ message: 'Community created successfully', id })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const getQuery = sql`
        SELECT * FROM communities WHERE enabled = true AND network = 'goerli';
      `

    const result = await getQuery

    return NextResponse.json({ communities: result.rows })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
