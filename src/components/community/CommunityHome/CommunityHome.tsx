'use client'

import Joined from './Joined'
import General from './General'
import DroppedOn from './DroppedOn'

const CommunityHome = () => {
  return (
    <main className="relative mx-auto max-w-[936px] px-2 pb-4">
      <General status="voting" />
      <Joined />
      <DroppedOn />
      <General status="passed" />
    </main>
  )
}

export default CommunityHome
