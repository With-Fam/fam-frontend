# Instructions for Simplified Create Experience

goal: Track title and description for each proposal using the Stack SDK.

current state: There are inputs for title and description in the create activity page. However, the title and description are not being tracked.

### Solution

1. Install the Stack SDK. create a client.ts file in the src/lib/stack folder.
2. Add any ENV required.
3. add a trackNewProposal function in the src/lib/stack/ directory.
4. Add the trackNewProposal function to the create activity page.
5. get proposalId from the transaction receipt and pass the correct value to the trackNewProposal function.
