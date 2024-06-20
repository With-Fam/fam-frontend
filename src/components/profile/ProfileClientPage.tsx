'use client'

// Framework
import dynamic from 'next/dynamic'

// Third Parties
import useSWR from 'swr'

// Local Components
import { UserAvatar } from '@/components/shared'
import { Heading } from '@/stories'
import { Loading } from '@/components/shared'
import {
  UserActivity,
  UserCommunity,
  UserKey,
  CommunitiesPagination,
} from '@/components/profile'
const UserName = dynamic(() => import('@/components/shared/UserName'), {
  ssr: false,
})

// Utils
import SWR_KEYS from '@/constants/swrKeys'
import { walletSnippet } from '@/lib/helpers'

// Types
type UsersProfileProps = {
  type: string
  user: string
  page: string
  chainID: CHAIN_ID
  network: string
}

// Helpers
import { USERS_PROFILE_DATA } from '@/content/users-profile'
import { getUserData } from '@/components/profile/client-data'
import { CHAIN_ID } from '@/types'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ProfileClientPage = ({
  type,
  user,
  page,
  chainID,
  network,
}: UsersProfileProps): JSX.Element => {
  const {
    data: userData,
    error,
    isValidating,
  } = useSWR([SWR_KEYS.PROFILE_TOKENS, chainID, user, page], () =>
    getUserData({ user, chainID, page }).then((data) => data)
  )

  if (isValidating) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <Loading
          title="Getting user's profile"
          description="Please, hold on a second."
        />
      </div>
    )
  }

  if (!userData || error) {
    return <div className="px-16">Sorry, user not found</div>
  }

  return (
    <div className="px-4">
      <div className="mt-24 flex flex-col items-center">
        <UserAvatar address={user} width={80} height={80} />
        <Heading as="h5" className="mt-3">
          <UserName address={user as `0x${string}`} blankComponent /> Profile
        </Heading>
        <div className="mb-4 mt-2">
          <UserKey address={user}>{walletSnippet(user)}</UserKey>
        </div>
      </div>
      {type === 'communities' && (
        <>
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-4">
            {userData.tokens?.tokens.map((community, index) => (
              <UserCommunity
                key={index}
                community={community}
                network={network}
              />
            ))}
          </div>
          <CommunitiesPagination
            user={user}
            network={network}
            hasNextPage={userData.hasNextPage}
            page={page}
          />
        </>
      )}

      {type === 'activity' && (
        <div className="mx-auto flex max-w-[960px] flex-col gap-4">
          {USERS_PROFILE_DATA[0].activity.map((activity, index) => (
            <UserActivity key={index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfileClientPage
