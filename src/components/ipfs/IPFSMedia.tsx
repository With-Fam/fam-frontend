import { Icon } from '@/components/Icon'
import React, { useCallback, useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'

const Waveform = ({ src, onCancel }: any) => {
  const containerRef = useRef() as any

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 30,
    progressColor: '#000000',
    waveColor: '#d2d2d2',
    url: src,
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  const cancel = () => {
    if (isPlaying) onPlayPause()
    onCancel()
  }

  return (
    <div className="flex w-fit items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange">
        <button type="button" onClick={onPlayPause}>
          {isPlaying ? (
            <Icon id="pause" fill="#ffffff" />
          ) : (
            <Icon id="play" fill="#ffffff" />
          )}
        </button>
      </div>
      <div
        className="relative aspect-[585/12] w-[200px] md:w-[500px]"
        ref={containerRef}
      />
      <button type="button" onClick={cancel}>
        <Icon id="trash" fill="#d2d2d2" />
      </button>
    </div>
  )
}

export default Waveform
