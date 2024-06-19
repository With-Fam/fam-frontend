import { useState } from 'react'

const AddComment = ({ onClick }: any) => {
  const [comment, setComment] = useState('')

  return (
    <div className="my-4 flex items-center gap-4">
      <input
        type="text"
        className="grow rounded-md border border-grey border-grey p-2 !outline-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="button"
        className="rounded-full border px-4 py-2 text-green"
        onClick={() => onClick(comment)}
      >
        Add Comment
      </button>
    </div>
  )
}

export default AddComment
