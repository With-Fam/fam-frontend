'use client'

import React from 'react'
import PartyCard from '@/components/Pages/ProfilePage/PartyCard'
import { Loading } from '@/components/shared'
import EnsAddress from '@/components/shared/EnsAddress'
import { Heading } from '@/stories'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import { Paragraph } from '@zoralabs/zord'
import { Copy } from '@/components/icons'
import truncateAddress from '@/lib/truncateAddress'
import useCopyToClipboard from '@/hooks/useCopyToClipboard'
import useUserActivites from '@/hooks/useUserActivites'
import UserImage from '@/components/Pages/UserImage'
import useUserAvatar from '@/hooks/useUserAvatar'
import getEnsPfpLink from '@/lib/getEnsPfpLink'

const ProfilePage = () => {
  const { user } = useParams() as any
  const { loading, joinedParties } = useUserActivites(user as Address)
  const { copyToClipboard, copySuccess } = useCopyToClipboard()
  const { userAvatar } = useUserAvatar(user)

  return (
    <main className="mx-auto mt-10 flex max-w-[936px] flex-col items-center px-2 pb-4 pt-[90px] md:pt-[110px]">
      <UserImage
        address={user as Address}
        ensImage={
          getEnsPfpLink(userAvatar?.ensNames?.[`${user?.toLowerCase()}`]) ||
          userAvatar?.openSeaProfileImages?.[`${user?.toLowerCase()}`]
        }
      />
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
          joinedParties.map((data: any, i: number) => (
            <PartyCard partyInfo={data} key={i} />
          ))
        )}
      </div>
    </main>
  )
}

export default ProfilePage
