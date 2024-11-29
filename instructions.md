# Instructions for Creating a Hypersub on Fam

goal: create a Hypersub after creating a Party.

Documentation: https://docs.partydao.org/docs/partys/AtomicManualParty

1. create a new button <DeployHypersubButton> in the CreateCommunity experience. Reference <ConfirmForm /> for button UX & styling.
2. create a new ABI file for the HypersubFactory. ex. src/lib/abi/atomicManualPartyAbi.ts
3. new hook useDeployHypersub.tsx. 2 exports: deployHypersub and hypersubAddress.
4. update CreateCommunityProvider.tsx to use the new useDeployHypersub hook.
5. add a new section to CreateCommunityProvider.tsx after the deploy section called "Hypersub".
6. onBothSuccess, show both the hypersub and the party address with the done button.
