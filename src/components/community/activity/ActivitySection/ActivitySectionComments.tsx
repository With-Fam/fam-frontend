/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ActivitySectionComments = (): JSX.Element => (
  <div className="rounded-s-lg bg-white p-3">
    <input
      type="text"
      name="comment"
      id="comment"
      placeholder="Add a comment"
      className="w-full rounded-md bg-grey-light p-2 font-abc text-sm text-black outline-none placeholder:text-grey-dark"
    />
  </div>
)

export default ActivitySectionComments
