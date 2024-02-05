'use client'

import { JsonRpcProvider, AbstractProvider, isAddress } from 'ethers'

import { RPC_URL } from '@/constants/rpc'
import { CHAIN_ID } from '@/types'
import { getChainFromLocalStorage } from '@/utils/getChainFromLocalStorage'

const defaultProvider: AbstractProvider = new JsonRpcProvider(
  RPC_URL[CHAIN_ID.ETHEREUM]
)

export type IsValidAddressResult = {
  data: boolean
  error?: string
}

export async function isValidAddress(
  address: string,
  provider: AbstractProvider | undefined = defaultProvider
): Promise<IsValidAddressResult> {
  try {
    if (isAddress(address)) return { data: true }

    const { id: chainId } = getChainFromLocalStorage()

    let resolvedName: string | null

    if (chainId === CHAIN_ID.ETHEREUM || chainId === CHAIN_ID.BASE_SEPOLIA) {
      resolvedName = await provider?.resolveName(address)
    } else {
      const [nameResponse, codeResponse] = await Promise.all([
        provider?.resolveName(address),
        provider?.getCode(address),
      ])

      if (codeResponse !== '0x')
        return {
          data: false,
          error: 'ENS for contracts is not supported on L2',
        }

      resolvedName = nameResponse
    }

    return {
      data: !!resolvedName,
      error: resolvedName ? undefined : 'Invalid address',
    }
  } catch {
    return { data: false, error: 'Invalid address' }
  }
}

export async function getEnsAddress(
  address: string,
  provider: AbstractProvider | undefined = defaultProvider
): Promise<string> {
  let resolvedName
  try {
    resolvedName = await provider?.resolveName(address)
  } catch (e) {
    console.log(e)
  }

  return resolvedName ?? address
}

export async function getEnsName(
  address: string,
  provider: AbstractProvider | undefined = defaultProvider
): Promise<Maybe<string>> {
  return await provider?.lookupAddress(address)
}

type Maybe<T> = T | null
