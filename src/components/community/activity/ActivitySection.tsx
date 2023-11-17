'use client'

// Framework
import Image from 'next/image'
import Link from 'next/link'

// Local Components
import { Paragraph, PollComponent } from '@/stories'
import { Button } from '@/components/shared'
import { VoteBlock } from '@/components/community/activity'
import { ExternalLink, LongArrow } from '@/components/icons'

// Context
import { useMockStoreContext } from '@/contexts/mock-store'

// Utils
import { formatDate } from '@/utils/shared'

// Types
type ActivitySectionProps = {
  activityId: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySection = ({ activityId }: ActivitySectionProps): JSX.Element => {
  const { actions, widgets } = useMockStoreContext()
  const action = actions.find((action) => action.id === activityId)
  const widget = widgets.find((widget) => widget.id === activityId)

  if (!action) {
    return (
      <section className="p-4">
        <Paragraph as="p3">No action found</Paragraph>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-2xl p-5">
      <div className="flex h-8 w-8 cursor-pointer flex-col items-center justify-center rounded-full bg-grey-light">
        <Link href="/community/activity" passHref>
          <LongArrow />
        </Link>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex justify-between pb-2 pt-5">
            <div className="mb-2 flex items-center gap-2 md:mb-0">
              <div className="relative h-4 w-4">
                <Image
                  src={action.creator.image}
                  alt=""
                  fill
                  className="h-4 w-4 rounded-full object-cover"
                />
              </div>
              <Paragraph as="p5" className="text-grey">
                by {action.creator.name}
              </Paragraph>
            </div>
            <Paragraph as="p5" className="mb-4 text-grey">
              {formatDate(action.date)}
            </Paragraph>
          </div>
          <div className="flex justify-between">
            <div>
              <Paragraph as="p3" className="mb-1">
                {action.title}
              </Paragraph>
              <div className="flex flex-1 justify-start">
                <PollComponent status={action.status} />
              </div>
            </div>
            <div>
              <Button type="button" className="hidden w-20 px-3 py-2 sm:block">
                <Paragraph as="p5">Vote</Paragraph>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <VoteBlock votes={0} direction="Yes" />
          <VoteBlock votes={0} direction="No" />
        </div>
        <div>
          <Paragraph as="p4">
            <span
              className="editor-content"
              dangerouslySetInnerHTML={{ __html: action.description }} // WARNING: This neeeds to be cleaned here and before saved!
            />
          </Paragraph>
        </div>
        <div>
          <Link
            className="flex text-orange"
            href={`/community/actions`}
            passHref
          >
            <Paragraph as="p5">Actions</Paragraph>
            <span>
              <ExternalLink color="#F54D18" />
            </span>
          </Link>
        </div>
        {widget && (
          <div className="box-content w-full sm:w-[322px]">
            <div className="relative flex gap-4 rounded-2xl bg-white p-4">
              <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-grey-light">
                {widget.image && (
                  <Image
                    src={widget.image}
                    fill
                    className="rounded-md object-cover"
                    alt={action.title}
                  />
                )}
              </div>
              <div className="text-left">
                <Paragraph as="p3" className="mb-2">
                  {widget.title}
                </Paragraph>
                <Paragraph as="p5" className="text-grey">
                  {widget['action-title']}
                </Paragraph>
              </div>
            </div>
          </div>
        )}
        <Button type="button" className="block sm:hidden">
          Vote
        </Button>
        <div className="rounded-s-lg bg-white p-3">
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment"
            className="w-full rounded-md bg-grey-light p-2 font-abc text-sm text-black outline-none placeholder:text-grey-dark"
          />
        </div>
      </div>
    </section>
  )
}

export default ActivitySection
