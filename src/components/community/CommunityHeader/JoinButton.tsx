const JoinButton = ({ children, onClick = () => {} }: any) => {
  return (
    <button
      type="button"
      className="h-8 w-[80px] rounded-full bg-black font-abc text-white"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default JoinButton
