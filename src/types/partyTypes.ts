export interface BytecodeProposalData {
  target: string // dapp address (payable field)
  value: string
  data: string // bytecode
  optional: boolean // If true, the call is allowed to fail.
  expectedResultHash: string // Hash of the successful return data of the call. If 0x0, no return data checking will occur for this call.
}

export interface BytecodeProposalDataSanitized {
  [index: number]: BytecodeProposalData
}

export enum ProposalType {
  Invalid,
  ListOnOpensea,
  ListOnZora,
  Fractionalize,
  ArbitraryCalls,
  UpgradeProposalEngineImpl,
  ListOnOpenseaAdvanced,
  Distribute,
  AddAuthority,
  Operator,
  SetSignatureValidatorProposal,
  SetGovernanceParameterProposal,
}
