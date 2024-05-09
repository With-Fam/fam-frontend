import { PointyTopIcon } from '@/components/icons'
import { Paragraph } from '@/stories'

const MissingActivities = ({ communityName }: { communityName: string }) => (
  <div className="mx-auto mb-8 flex w-64 flex-col items-center justify-center gap-4">
    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-grey-light">
      <PointyTopIcon color="#F54D18" className="h-8 w-8" />
    </div>
    <Paragraph as="p3" className="text-center text-grey-dark">
      {communityName} hasn&apos;t posted any activities yet
    </Paragraph>
  </div>
)

export default MissingActivities
