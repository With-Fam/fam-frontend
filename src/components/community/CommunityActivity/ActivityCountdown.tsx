//Types
type CountdownProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  end: number
  onEnd: () => void
}

// Helpers
import { useCountdown } from '@/hooks/useCountdown'
import { useIsMounted } from '@/hooks/useIsMounted'
import { Paragraph } from '@/stories'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivityCountdown = ({
  end,
  onEnd,
}: CountdownProps): JSX.Element => {
  const isMounted = useIsMounted()
  const { countdownStringDays, isEnded } = useCountdown(Number(end), onEnd)

  if (!isMounted) return <></>

  return (
    <Paragraph as="p3">
      {isEnded ? '00h 00m 00s' : countdownStringDays}
    </Paragraph>
  )
}

export default ActivityCountdown
