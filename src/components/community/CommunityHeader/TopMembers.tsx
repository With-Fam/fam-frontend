import Image from 'next/image'

const TopMembers = () => {
  const members = [
    'https://i.imgur.com/zlN15f4.png',
    'https://i.imgur.com/rGMLgmJ.png',
    'https://i.imgur.com/Ep67ZNU.png',
    'https://i.imgur.com/Nhmh1DG.png',
  ]

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex">
        {members.map((member, i) => (
          <Image
            key={member}
            src={member}
            alt=""
            className="relative rounded-full"
            style={{
              transform: `translateX(-${5 * i}px)`,
              zIndex: `${5 * i}`,
            }}
            width={24}
            height={24}
          />
        ))}
      </div>
      <p className="text-md -translate-x-3 font-abc text-grey">
        23,450 members
      </p>
    </div>
  )
}

export default TopMembers
