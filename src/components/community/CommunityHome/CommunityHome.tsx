'use client'

import Joined from './Joined'
import General from './General'

const CommunityHome = () => {
  return (
    <main className="relative mx-auto max-w-[936px] px-2">
      <General />
      <Joined />
    </main>
  )
}

export default CommunityHome
