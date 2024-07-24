import { Icon } from '@/components/Icon'
import React, { useCallback, useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'

const Waveform = ({ src, onCancel }: any) => {
  const containerRef = useRef() as any

  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 30,
    progressColor: '#d2d2d2',
    waveColor: '#DDE1F0',
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
      <div className="flex items-center gap-2 rounded-[8px] bg-white-primary px-2 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange">
          <button type="button" onClick={onPlayPause}>
            {isPlaying ? (
              <Icon id="pause" fill="#ffffff" size="lg" />
            ) : (
              <Icon id="play" fill="#ffffff" size="lg" />
            )}
          </button>
        </div>
        <div
          className="relative aspect-[585/12] w-[200px] md:w-[500px]"
          ref={containerRef}
        />
      </div>
      <button type="button" onClick={cancel}>
        <Icon id="trash" fill="#d2d2d2" />
      </button>
    </div>
  )
}

export default Waveform
