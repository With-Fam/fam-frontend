// Framework
import type { Metadata } from 'next'

// Local Components
import { AddButton, AuctionsIntro } from '@/components/create-activity'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Create New Activity',
  description: 'to do',
}

const CreateActivityPage = (): JSX.Element => (
  <>
    <AuctionsIntro />
    <AddButton />
  </>
)

export default CreateActivityPage
