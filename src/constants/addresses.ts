import { AddressType, CHAIN_ID } from '@/types'
import { Address } from 'viem'

export type L2ChainType =
  | CHAIN_ID.OPTIMISM
  | CHAIN_ID.OPTIMISM_SEPOLIA
  | CHAIN_ID.BASE
  | CHAIN_ID.BASE_SEPOLIA
  | CHAIN_ID.ZORA
  | CHAIN_ID.ZORA_SEPOLIA

export const PUBLIC_MANAGER_ADDRESS = {
  [CHAIN_ID.ETHEREUM]:
    '0xd310a3041dfcf14def5ccbc508668974b5da7174' as AddressType,
  [CHAIN_ID.OPTIMISM]:
    '0x3ac0E64Fe2931f8e082C6Bb29283540DE9b5371C' as AddressType,
  [CHAIN_ID.SEPOLIA]:
    '0x0ca90a96ac58f19b1f69f67103245c9263bc4bfc' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x1004e43b540af4dfde2737c29893716817b0a1d7' as AddressType,
  [CHAIN_ID.BASE]: '0x3ac0e64fe2931f8e082c6bb29283540de9b5371c' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x550c326d688fd51ae65ac6a2d48749e631023a03' as AddressType,
  [CHAIN_ID.ZORA]: '0x3ac0E64Fe2931f8e082C6Bb29283540DE9b5371C' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]:
    '0x550c326d688fd51ae65ac6a2d48749e631023a03' as AddressType,
  [CHAIN_ID.FOUNDRY]:
    '0xd310a3041dfcf14def5ccbc508668974b5da7174' as AddressType,
}

export const PARTY_FACTORY = {
  [CHAIN_ID.BASE]: '0x68e9fC0e4D7af69Ba64dD6827BFcE5CD230b8F3d' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xB418f5B001Af94A91daB2cE641E39722e1d9dDAC' as AddressType,
}
export const PARTY_IMPLEMENTATION = {
  [CHAIN_ID.BASE]: '0x5e86bd1664EEC67A808A85e65fAF16A99c83AF8C' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xeFA4054F3Db3D1f5e981513a3d8A33D91FC97dc1' as AddressType,
}

export const PARTY_OPT_AUTHORITIES = {
  [CHAIN_ID.BASE]: [
    '0x4a4D5126F99e58466Ceb051d17661bAF0BE2Cf93',
    '0xD665c633920c79cD1cD184D08AAC2cDB2711073c',
  ],
  [CHAIN_ID.BASE_SEPOLIA]: [
    '0xD73a81cD18928b98A22008f1e28c81bb97202deE',
    '0x8723B021b008dD370FBEc1C791C390A2BC957654',
  ],
}

export const SELL_PARTY_CARD_AUTHORITY = {
  [CHAIN_ID.BASE]: '0xD665c633920c79cD1cD184D08AAC2cDB2711073c',
  [CHAIN_ID.BASE_SEPOLIA]: '0x8723B021b008dD370FBEc1C791C390A2BC957654',
}

export const GOVERNANCE_OPT_FEE_RECIPIENT = {
  [CHAIN_ID.BASE]: '0xF498fd75Ee8D35294952343f1A77CAE5EA5aF6AA',
  [CHAIN_ID.BASE_SEPOLIA]: '0x0e63D6f414b40BaFCa676810ef1aBf05ECc8E459',
}

export const CROWDFUND_PARTY_FACTORY = {
  [CHAIN_ID.BASE]: '0xb47236563562411eC73F29C7215CC6D5C82C82FF' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xc0983f3a300834d0e7e450ff61ab05c3986b0a1a' as AddressType,
}

export const INITIAL_ETH_CROWDFUND = {
  [CHAIN_ID.BASE]: '0x5a5Ae30930953AB7F33fbDed8ca4d67120d3Ce19' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xE864Aa11D58492cEab10eE7Ea03200D4dA78363C' as AddressType,
}

export const METADATA_PROVIDER = {
  [CHAIN_ID.BASE]: '0x39244498E639C4B24910E73DFa3622881D456724' as Address,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x51fD9005F3b9606D1aa8bd6F7455020b051E1d91' as Address,
}

export const PUBLIC_L1_BRIDGE_ADDRESS = {
  [CHAIN_ID.OPTIMISM]:
    '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x16Fc5058F25648194471939df75CF27A2fdC48BC' as AddressType,
  [CHAIN_ID.BASE]: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x49f53e41452C74589E85cA1677426Ba426459e85' as AddressType,
  [CHAIN_ID.ZORA]: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]:
    '0xeffE2C6cA9Ab797D418f0D91eA60807713f3536f' as AddressType,
}

export const PUBLIC_BUILDER_ADDRESS = {
  [CHAIN_ID.ETHEREUM]:
    '0xDC9b96Ea4966d063Dd5c8dbaf08fe59062091B6D' as AddressType, // builder treasury address
}

export const PUBLIC_NOUNS_ADDRESS = {
  [CHAIN_ID.ETHEREUM]:
    '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10' as AddressType, // nouns treasury address
}

export const PUBLIC_ZORA_NFT_CREATOR = {
  [CHAIN_ID.ETHEREUM]:
    '0xF74B146ce44CC162b601deC3BE331784DB111DC1' as AddressType,
  [CHAIN_ID.OPTIMISM]:
    '0x7d1a46c6e614A0091c39E102F2798C27c1fA8892' as AddressType,
  [CHAIN_ID.SEPOLIA]:
    '0x87cfd516c5ea86e50b950678CA970a8a28de27ac' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE]: '0x58C3ccB2dcb9384E5AB9111CD1a5DEA916B0f33c' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA]: '0xA2c2A96A232113Dd4993E8b048EEbc3371AE8d85' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]:
    '0x6b28d7C2F8b2C2189e95b89B67886eEb16489a97' as AddressType,
  [CHAIN_ID.FOUNDRY]:
    '0xF74B146ce44CC162b601deC3BE331784DB111DC1' as AddressType,
}

export const NULL_ADDRESS =
  '0x0000000000000000000000000000000000000000' as AddressType

export const SALE_STRATEGY = {
  [CHAIN_ID.BASE]: '0x04E2516A2c207E84a1839755675dfd8eF6302F0a' as AddressType, // builder
  [CHAIN_ID.BASE_SEPOLIA]:
    '0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE' as AddressType,
}
