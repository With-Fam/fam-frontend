// Framework
import { Stack, Text } from '@zoralabs/zord'

type AirdropProps = {
  callback: () => void
}

export function Airdrop({ callback }: AirdropProps): JSX.Element {
  return (
    <Stack>
      <Text color="negative">
        You need to run an auction in order to access airdrops.
      </Text>
    </Stack>
  )
}
