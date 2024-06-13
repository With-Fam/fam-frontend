import useCommunityJoin from '@/hooks/useCommunityJoin'

const JoinButton = () => {
  const { join, checkJoining, joined, loading } = useCommunityJoin()

  const onJoin = async () => {
    await join()
    await checkJoining()
  }

  if (!joined) return <div />

  return (
    <button
      type="button"
      className="h-8 w-[80px] rounded-full bg-black font-abc text-white"
      onClick={onJoin}
    >
      {loading ? 'Joining...' : 'Join'}
    </button>
  )
}

export default JoinButton
