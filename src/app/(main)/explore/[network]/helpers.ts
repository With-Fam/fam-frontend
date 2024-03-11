import { sql } from '@vercel/postgres'

export const filterFromDataBase = async (
  trending: boolean
): Promise<string[]> => {
  const getQuery = sql`
        SELECT * FROM communities WHERE enabled = true AND network = 'goerli';
      `

  const result = await getQuery

  const daos: string[] = []
  result.rows.forEach((row) => {
    if (trending && row.featured) {
      daos.push(row.community_id)
    }

    if (!trending) {
      daos.push(row.community_id)
    }
  })

  return daos
}
