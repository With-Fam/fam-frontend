'use client'

import Pool from './Pool'
import PoolAddress from './PoolAddress'

const AboutPage = () => {
  return (
    <main className="relative max-w-[936px] p-4 md:mx-auto">
      <div className="rounded-md bg-white p-3">
        <Pool />
        <PoolAddress />
      </div>
    </main>
  )
}

export default AboutPage
