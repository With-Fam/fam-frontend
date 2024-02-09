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
import { useChainStore } from '@/utils/stores/useChainStore'
import SWR_KEYS from '@/constants/swrKeys'
import { walletSnippet } from '@/utils/helpers'

// Types
type UsersProfileProps = {
  type: string
  user: string
  page: string
}

// Helpers
import { USERS_PROFILE_DATA } from '@/content/users-profile'
import { getUserData } from '@/components/profile/client-data'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ProfileClientPage = ({
  type,
  user,
  page,
}: UsersProfileProps): JSX.Element => {
  const chain = useChainStore((x) => x.chain)
  console.log('useChainStore', chain)
  const {
    data: userData,
    error,
    isValidating,
  } = useSWR([SWR_KEYS.PROFILE_TOKENS, chain.id, user, page], () =>
    getUserData({ user, chainID: chain.id, page }).then((data) => data)
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
          <UserKey>{walletSnippet(user)}</UserKey>
        </div>
      </div>
      {type === 'communities' && (
        <>
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-4">
            {userData.tokens?.tokens.map((community, index) => (
              <UserCommunity
                key={index}
                community={community}
                network={chain.slug}
              />
            ))}
          </div>
          <CommunitiesPagination
            user={user}
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
