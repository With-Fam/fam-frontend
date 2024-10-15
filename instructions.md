# Instructions for Join Fam Authority

goal: add Join Fam Authority to the array of authorities in a Party setup

1. locate the authority array used in the creation of a new party.
2. Add the JoinFamAuthority address to the array from baseSepolia.
3. Create a party locally with the new authorities array.
4. Verify on basescan events that the authority was added.
5. use the join method on the authority
   - verify on basescan that the user has been added to the party
   - verify in fam / party the user can create a new proposal in the party
