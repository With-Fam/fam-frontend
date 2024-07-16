'use client'

import React from 'react'
import PartyCard from '@/components/Pages/ProfilePage/PartyCard'
import { Loading, UserAvatar } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import useJoinedParties from '@/hooks/useJoinedParties'
import { Heading } from '@/stories'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import { Paragraph } from '@zoralabs/zord'
import { Copy } from '@/components/icons'
import truncateAddress from '@/lib/truncateAddress'
import useCopyToClipboard from '@/hooks/useCopyToClipboard'

const ProfilePage = () => {
  const { network, user } = useParams()
  const { parties, loading, hasNextPage, loadMore } = useJoinedParties(
    parseInt(network as string, 10),
    user as Address
  )
  const { copyToClipboard, copySuccess } = useCopyToClipboard()

  return (
    <main className="mx-auto mt-10 flex max-w-[936px] flex-col items-center px-2 pb-4">
      <UserAvatar address={user as Address} width={80} height={80} />
      <Heading as="h5" className="mt-3">
        <EnsAddress address={user as Address} />
      </Heading>
      <div className="mb-4 mt-2">
        <Paragraph as="p5" className="flex text-gray-500">
          <span className="pr-1">{truncateAddress(user as Address)}</span>
          <button
            onClick={() => copyToClipboard(user as Address)}
            aria-label="copy user name"
          >
            <Copy color={copySuccess ? '#F54D18' : undefined} />
          </button>
        </Paragraph>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 px-3 md:grid-cols-3">
        {loading ? (
          <div className="mt-8 flex justify-center md:col-span-3">
            <Loading />
          </div>
        ) : (
          parties.map((data: any, i: number) => (
            <PartyCard partyInfo={data} key={i} />
          ))
        )}
      </div>
      {hasNextPage && !loading && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-full bg-blue-light px-3 py-1 font-abcMedium text-white"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  )
}

export default ProfilePage
