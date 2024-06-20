'use client'

import Pool from './Pool'
import PoolAddress from './PoolAddress'

const AboutPage = () => {
  return (
    <main className="relative mx-auto max-w-[936px] rounded-md bg-white p-4">
      <Pool />
      <PoolAddress />
    </main>
  )
}

export default AboutPage
