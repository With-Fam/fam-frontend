const VotesBar = ({ value }: any) => (
  <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-grey-light">
    <div
      className="absolute left-0 top-0 h-full bg-green"
      style={{
        width: `${100 * value}%`,
      }}
    />
  </div>
)

export default VotesBar
