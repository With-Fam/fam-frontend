// Local Component
import { Hero, FeatureWidgets, CollectiveCulture, FAQ } from '@/components/home'

/*--------------------------------------------------------------------*/

/**
 * Page
 */
export default function Home(): JSX.Element {
  return (
    <>
      <Hero />
      <FeatureWidgets />
      <CollectiveCulture />
      <FAQ />
    </>
  )
}
