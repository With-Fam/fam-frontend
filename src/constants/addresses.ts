import { CHAIN_ID } from '@/types'
import { Address } from 'viem'

// Fam

export const MANAGE_FAM_AUTHORITY = {
  [CHAIN_ID.BASE]: '0x8eaC17a5A609976507734e979873d7c3B3eEbeb6' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x8eaC17a5A609976507734e979873d7c3B3eEbeb6' as Address,
}

// HYPERSUB
export const HYPERSUB_FACTORY = {
  [CHAIN_ID.BASE]: '0xd79A71657a45F713817cB5366053a7629AF8Fe74' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x3E4996Dc97B05C7e5379A2f6F4B844643BB1D9F2' as Address,
}

// PARTY
export const ATOMIC_MANUAL_PARTY = {
  [CHAIN_ID.BASE]: '0x41d071Ff2cED5ad20E6551B1BfF0dB47111203BF' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xFaf888e0bB892d525a17F71690855562B9D97d77' as Address,
}

export const PARTY_FACTORY = {
  [CHAIN_ID.BASE]: '0x68e9fC0e4D7af69Ba64dD6827BFcE5CD230b8F3d' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xB418f5B001Af94A91daB2cE641E39722e1d9dDAC' as Address,
}
export const PARTY_IMPLEMENTATION = {
  [CHAIN_ID.BASE]: '0x5e86bd1664EEC67A808A85e65fAF16A99c83AF8C' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xeFA4054F3Db3D1f5e981513a3d8A33D91FC97dc1' as Address,
}

export const PARTY_OPT_AUTHORITIES = {
  [CHAIN_ID.BASE]: [
    MANAGE_FAM_AUTHORITY[CHAIN_ID.BASE],
    '0x4a4D5126F99e58466Ceb051d17661bAF0BE2Cf93',
    '0xD665c633920c79cD1cD184D08AAC2cDB2711073c',
  ] as Address[],
  [CHAIN_ID.BASE_SEPOLIA]: [
    MANAGE_FAM_AUTHORITY[CHAIN_ID.BASE_SEPOLIA],
    '0xD73a81cD18928b98A22008f1e28c81bb97202deE',
    '0x8723B021b008dD370FBEc1C791C390A2BC957654',
  ] as Address[],
}

export const SELL_PARTY_CARD_AUTHORITY = {
  [CHAIN_ID.BASE]: '0xD665c633920c79cD1cD184D08AAC2cDB2711073c',
  [CHAIN_ID.BASE_SEPOLIA]: '0x8723B021b008dD370FBEc1C791C390A2BC957654',
}

export const GOVERNANCE_OPT_FEE_RECIPIENT = {
  [CHAIN_ID.BASE]: '0xF498fd75Ee8D35294952343f1A77CAE5EA5aF6AA' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x0e63D6f414b40BaFCa676810ef1aBf05ECc8E459' as Address,
}

export const CROWDFUND_PARTY_FACTORY = {
  [CHAIN_ID.BASE]: '0xb47236563562411eC73F29C7215CC6D5C82C82FF' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xc0983f3a300834d0e7e450ff61ab05c3986b0a1a' as Address,
}

export const INITIAL_ETH_CROWDFUND = {
  [CHAIN_ID.BASE]: '0x5a5Ae30930953AB7F33fbDed8ca4d67120d3Ce19' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xE864Aa11D58492cEab10eE7Ea03200D4dA78363C' as Address,
}

export const METADATA_PROVIDER = {
  [CHAIN_ID.BASE]: '0x39244498E639C4B24910E73DFa3622881D456724' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x51fD9005F3b9606D1aa8bd6F7455020b051E1d91' as Address,
}

// Zora

export const SALE_STRATEGY = {
  [CHAIN_ID.BASE]: '0x04E2516A2c207E84a1839755675dfd8eF6302F0a' as Address, // builder
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE' as Address,
}

// MULTICALL

export const MULTICALL = '0xcA11bde05977b3631167028862bE2a173976CA11' as Address

// 0xSplits
export const PUSH_SPLIT_FACTORY = {
  [CHAIN_ID.BASE]: '0xaDC87646f736d6A82e9a6539cddC488b2aA07f38',
  [CHAIN_ID.BASE_SEPOLIA]: '0xaDC87646f736d6A82e9a6539cddC488b2aA07f38',
} as const
