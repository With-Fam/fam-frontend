/*--------------------------------------------------------------------*/

/**
 * Component
 */

const CommunitySkeleton = (): JSX.Element => (
  <div className="h-full w-80 animate-pulse">
    <div className="relative z-0 h-80 w-80 rounded-lg bg-gray-400" />
    <div className="my-3 h-5 w-full rounded-sm bg-gray-300" />
    <div className="h-5 w-full rounded-sm bg-gray-200" />
  </div>
)

export default CommunitySkeleton
