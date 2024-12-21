# Instructions for Link Existing Hypersub

goal: Add the ability to link an existing hypersub to a Fam instead of creating a new hypersub.

current state: You must create a new hypersub for each Fam. There is no way to link an existing hypersub to a Fam.

### Solution

1. <HypersubDropdown> - new component - state default
2. src/modules/create-community/components/membership/Advanced.tsx - add the HypersubDropdown component
3. Figma - Link Existing Hypersub - expanded
4. Figma - Link Existing Hypersub - tooltip - Implement the tooltip for Link Existing Hypersub dropdown - text: Link any Hypersub that you are the owner of. The Founder split of revenue from memberships will accrue to the Hypersub contract
5. hook - useOwnerHypersubs - create a hook for the Dropdown to use to get the Hypersub subscription contracts which I am the owner of. See resources for more details.
6. deploy provider - use the useOwnerHypersubs hook

## Resources

### useOwnerHypersubs

contracts - array of hypersub contracts I am the owner of hypersub contracts

- chainId
- address
- image
- title
- description
