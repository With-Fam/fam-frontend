# Instructions for Linking a Hypersub to a Party on Fam

goal: call setHypersub in the CreateCommunityProvider after deploying both the Party and the Hypersub.

1. create a new button <SetHypersubButton> in the CreateCommunity experience. Reference <DeployHypersubButton /> for button UX & styling.
2. create a new ABI file for the ManageFamAuthority contract. ex. src/lib/abi/manageFamAuthorityAbi.ts
3. add ManageFamAuthority address to the constants.ts file.
4. new hook useSetHypersub.tsx. 2 exports: setHypersub and isHypersubSet.
5. update CreateCommunityProvider.tsx to use the new useSetHypersub hook.
6. add a new section to CreateCommunityProvider.tsx after the deploy section called "SetHypersub".
7. add onClick functionality to the SetHypersubButton.tsx so that it calls the setHypersub function in the useSetHypersub hook.
8. onSuccess, show both the hypersub and the party address with the done button.
