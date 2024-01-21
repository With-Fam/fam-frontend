'use client'

// Framework
import Image from 'next/image'

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
import { getUserData } from '@/components/profile/client-data'

// Utils
import { useEnsData } from '@/hooks/useEnsData'
import { useChainStore } from '@/utils/stores/useChainStore'
import SWR_KEYS from '@/constants/swrKeys'
import { walletSnippet } from '@/utils/helpers'

// Types
type UsersProfileProps = {
  type: string
  user: string
  page: string
}

// Static Content
import { USERS_PROFILE_DATA } from '@/content/users-profile'

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
  const { ensName, ensAvatar } = useEnsData(user)
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

  console.log('user data::;', userData)

  return (
    <div className="px-4">
      <div className="mt-24 flex flex-col items-center">
        <UserAvatar
          address={user}
          ensAvatar={ensAvatar}
          width={80}
          height={80}
        />
        <Heading as="h5" className="mt-3">
          {`${ensName || ''} Profile`}
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
