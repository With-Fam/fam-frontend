// Framework
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Local Components
import * as Icons from '@/components/icons'

/*--------------------------------------------------------------------*/

/**
 * Page
 */

export const metadata: Metadata = {
  title: 'Fam - Icons',
  description: 'Fam - Icons',
}

const StorePage = (): JSX.Element => {
  const iconComponents = Object.values(Icons)

  // Throw 404 if not in dev mode
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  return (
    <div className="text-primary h-screen w-screen bg-orange font-sans">
      <div className="w-full">
        <h1 className="mb-2 mt-8 text-center text-5xl text-yellow">
          Available Icons
        </h1>
        <h2 className="mb-8 text-center text-lg text-yellow">
          <span className="text-black">import</span>{' '}
          <span>{`{ iconName }`}</span> <span className="text-black">from</span>{' '}
          &apos;@/icons&apos;
        </h2>
        <div className="mx-auto grid w-full max-w-5xl grid-cols-6 gap-x-5 gap-y-8">
          {iconComponents.map((Icon, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <Icon className="m-0 h-12 w-12" color="black" />
              <p className="mt-2">{Object.keys(Icons)[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorePage
