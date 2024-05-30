'use client'

import Description from './Description'
import Header from './Header'
import Socials from './Socials'
import Pool from './Pool'
import PoolAddress from '@/components/community/CommunityAbout/PoolAddress'

const CommunityAbout = () => {
  return (
    <main className="relative mx-auto max-w-[936px] rounded-md bg-white p-4">
      <Header />
      <Description />
      <Socials />
      <Pool />
      <PoolAddress />
    </main>
  )
}

export default CommunityAbout
