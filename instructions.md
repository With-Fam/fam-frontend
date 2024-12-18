# Instructions for Simplified Create Experience

goal: Remove multicall3 and the creation of splits. Second step only creates the hypersub.

current state: First, create the party. Then, call multicall3 to create 2 splits and deploy the hypersub. Then, call setHypersub on the ManageFamAuthority.

### Solution

1. After party is created, call deploySubscription on the HypersubFactory instead of multicall3.
2. Remove unused code for multicall3 and splits.
3. remove unused function getDeployHypersubCallData and any unused imports.
4. remove unused ABI for multicall3 and splits.
