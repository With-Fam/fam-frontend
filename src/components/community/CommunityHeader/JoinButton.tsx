const JoinButton = () => {
  const handleClick = () => {
    console.log('SWEETS JOIN TX')
    console.log('SWEETS ContributionRouter call contributeFor')
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className="h-8 w-[80px] rounded-full bg-black font-abc text-white"
    >
      Join
    </button>
  )
}

export default JoinButton
