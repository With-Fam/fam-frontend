'use client'

// Third parties
import { getAddress } from 'ethers'

// Utils
import {
  type MyDaosResponse,
  myDaosRequest,
} from '@/data/subgraph/requests/daoQuery'
import {
  type TokensQueryResponse,
  tokensQuery,
} from '@/data/subgraph/requests/tokensQuery'

// Types
type UserDataResponse = {
  tokens: TokensQueryResponse
  daos: MyDaosResponse
  hasNextPage: boolean
}
type UserDataProps = {
  user: string
  page?: string
  chainID: number
}
type DaosDataProps = {
  address: string
}

/*--------------------------------------------------------------------*/

/**
 * Functions
 */

/**
 * Retrieves the DAOs data for a given address.
 * @param address - The address to fetch the DAOs data for.
 * @returns A promise that resolves to the DAOs data or undefined if not found.
 * @throws An error if the DAOs are not found or if the backend fails.
 */
export const getDaosData = async ({
  address,
}: DaosDataProps): Promise<MyDaosResponse | undefined> => {
  try {
    const daos = await myDaosRequest(address)

    if (daos) {
      return daos
    }
  } catch (e) {
    if (e) {
      throw new Error('daos not found')
    }

    throw new Error('backend failed')
  }
}

/**
 * Retrieves user data from the backend.
 * @param user - The user's identifier.
 * @param page - The page number for pagination.
 * @param chainID - The ID of the blockchain network.
 * @returns A promise that resolves to the user's data response.
 * @throws Error if the network input is invalid, the address input is invalid,
 * daos or tokens are not found, or the backend fails.
 */
export async function getUserData({
  user,
  page,
  chainID,
}: UserDataProps): Promise<UserDataResponse> {
  if (!chainID) {
    throw new Error('bad network input')
  }

  let address: string

  try {
    address = getAddress(user as string)
  } catch (e) {
    throw new Error('bad address input')
  }

  try {
    const daos = await getDaosData({ address })
    const tokens = await tokensQuery(
      chainID,
      address,
      page ? parseInt(page) : undefined
    )

    // The response has a next page key, but that does not work properly
    const tokensNextPage = await tokensQuery(
      chainID,
      address,
      page ? parseInt(page) + 1 : 2
    )

    if (!daos || !tokens) {
      throw new Error('daos or tokens not found')
    }

    return {
      tokens,
      daos,
      hasNextPage: tokensNextPage.tokens.length > 0,
    }
  } catch (e) {
    if (e) {
      throw new Error('tokens not found')
    }

    throw new Error('backend failed')
  }
}
