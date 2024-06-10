'use client'

import Pool from './Pool'
import PoolAddress from '@/components/community/CommunityAbout/PoolAddress'

const CommunityAbout = () => {
  return (
    <main className="relative mx-auto max-w-[936px] rounded-md bg-white p-4">
      <Pool />
      <PoolAddress />
    </main>
  )
}

export default CommunityAbout
