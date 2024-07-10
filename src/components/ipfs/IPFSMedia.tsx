import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/Icon'
import getPartyDaoIpfsLink from '@/lib/getPartyDaoIpfsLink'
import Image from 'next/image'

export function IPFSMedia({ src, onCancel }: any) {
  const url = getPartyDaoIpfsLink(src)
  const audioRef = useRef(null) as any
  const [isPlaying, setIsPlaying] = useState(false)

  const play = () => {
    audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !url) return
    audioRef.current = new Audio(url)
    const audio = audioRef.current

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    // eslint-disable-next-line consistent-return
    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [url])

  const onClick = () => {
    if (isPlaying) {
      pause()
      return
    }
    play()
  }

  const cancel = () => {
    if (isPlaying) pause()
    onCancel()
  }

  return (
    <div className="flex w-fit items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange">
        <button type="button" onClick={onClick}>
          {isPlaying ? (
            <Icon id="pause" fill="#ffffff" />
          ) : (
            <Icon id="play" fill="#ffffff" />
          )}
        </button>
      </div>
      <div className="relative aspect-[585/12] w-[200px] md:w-[500px]">
        <Image
          src="/assets/images/create-activity/audio_bar.png"
          layout="fill"
          alt="not found image"
          className="size-full"
        />
      </div>
      <button type="button" onClick={cancel}>
        <Icon id="trash" fill="#d2d2d2" />
      </button>
    </div>
  )
}
