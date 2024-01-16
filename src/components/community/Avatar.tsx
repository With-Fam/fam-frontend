'use client'
// Framework
import { UserAvatar } from '@/components/shared'

import { useEnsData } from '@/hooks/useEnsData'

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const Avatar = ({ token }: any) => {
  const { ensAvatar } = useEnsData(token)
  return (
    <UserAvatar ensAvatar={ensAvatar} width={24} height={24} address={token} />
  )
}

export default Avatar
