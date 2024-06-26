'use client'

import React from 'react'
import PartyCard from '@/components/Pages/ProfilePage/PartyCard'
import { Loading, UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import useCreatedParites from '@/hooks/useCreatedParties'
import { Heading } from '@/stories'
import { useParams } from 'next/navigation'
import { Address } from 'viem'

const ProfilePage = () => {
  const { network, user } = useParams()

  const { parties, loading } = useCreatedParites(
    parseInt(network as string, 10),
    user as Address
  )

  return (
    <main className="mx-auto mt-10 flex max-w-[936px] flex-col items-center px-2 pb-4">
      <UserAvatar address={user as Address} width={80} height={80} />
      <Heading as="h5" className="mt-3">
        Profile
      </Heading>
      <div className="mb-4 mt-2">
        <EnsAddress address={user as Address} />
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 mt-8 flex justify-center">
            <Loading />
          </div>
        ) : (
          parties.map((party: any) => <PartyCard party={party} key={party} />)
        )}
      </div>
    </main>
  )
}

export default ProfilePage
