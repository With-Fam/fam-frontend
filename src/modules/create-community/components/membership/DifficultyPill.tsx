import React from 'react'

const DifficultyPill = ({ threshold }: { threshold: number }) => {
  const isEasy = threshold >= 0 && threshold <= 25
  const isMedium = threshold > 25 && threshold < 66
  const isHard = threshold >= 66
  return (
    <div
      className={`rounded-full text-center ${isEasy ? 'bg-green-light text-green' : 'bg-orange-light text-orange'} w-[90px] px-2 py-1`}
    >
      {isEasy && 'Easy'}
      {isMedium && 'Medium'}
      {isHard && 'Hard'}
    </div>
  )
}

export default DifficultyPill
