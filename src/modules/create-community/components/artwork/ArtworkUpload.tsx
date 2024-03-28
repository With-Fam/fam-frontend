'use client'
import { BaseSyntheticEvent, useEffect } from 'react'

import { ArtworkUpload as UploadComponent } from '@/components/create-community/artwork'
import { IPFSUpload, useArtworkUpload } from '@/hooks'

import { useFormStore } from '../../stores'
import { ArtworkType } from '@/modules/create-community/components/artwork/schema'

interface ArtworkFormProps {
  helperText: string
  onChange: (a: Array<ArtworkType>) => void
}

export function ArtworkUpload({
  helperText,
  onChange,
}: ArtworkFormProps): JSX.Element {
  const {
    ipfsUpload,
    setUpArtwork,
    setSetUpArtwork,
    setIpfsUpload,
    isUploadingToIPFS,
    setIsUploadingToIPFS,
    orderedLayers,
    setOrderedLayers,
  } = useFormStore()

  const handleUploadSuccess = (ipfs: IPFSUpload[]) => {
    setIpfsUpload(ipfs)
    setIsUploadingToIPFS(false)
  }

  const handleUploadError = (err: Error) => {
    console.log('handleUploadError::', err)
    setIpfsUpload([])
    setIsUploadingToIPFS(false)
    return
  }
  const {
    images,
    fileInfo,
    filesArray,
    ipfsUploadError,
    uploadArtworkError,
    setUploadArtworkError,
    setFiles,
  } = useArtworkUpload({
    artwork: setUpArtwork?.artwork,
    ipfsUpload,
    isUploadingToIPFS,
    onUploadStart: () => setIsUploadingToIPFS(true),
    onUploadSuccess: handleUploadSuccess,
    onUploadError: handleUploadError,
  })

  const handleUpload = (e: BaseSyntheticEvent) => {
    setUploadArtworkError(undefined)
    setFiles(null)
    // setOrderedLayers([])
    setIpfsUpload([])
    setIsUploadingToIPFS(false) // Resetting setUpArtwork to its initial state
    setFiles(e.currentTarget.files)
    setOrderedLayers([])
  }

  // Added function to clear all items and reset state
  const handleReset = () => {
    setUploadArtworkError(undefined)
    setFiles(null)
    setOrderedLayers([])
    setIpfsUpload([])
    setIsUploadingToIPFS(false) // Resetting setUpArtwork to its initial state
  }

  /*

    add artwork traits and properties to store

  */
  useEffect(() => {
    const hasError =
      uploadArtworkError && Object.keys(uploadArtworkError).length > 0

    if (!fileInfo || !filesArray || !fileInfo.traits || hasError) {
      return
    }

    setSetUpArtwork({
      ...setUpArtwork,
      artwork: fileInfo.traits,
      filesLength: fileInfo.filesLength,
    })
    onChange(fileInfo.traits)
  }, [filesArray, fileInfo, uploadArtworkError])

  return (
    <UploadComponent
      artwork={setUpArtwork?.artwork}
      fileCount={setUpArtwork?.filesLength}
      traitCount={setUpArtwork.artwork?.length}
      helperText={helperText}
      onUpload={handleUpload}
      handleReset={handleReset} // Passing handleReset to UploadComponent
      isUploadingToIPFS={isUploadingToIPFS}
      ipfsUploadError={ipfsUploadError}
      uploadArtworkError={uploadArtworkError}
      setUploadArtworkError={setUploadArtworkError}
      orderedLayers={orderedLayers}
      setOrderedLayers={setOrderedLayers}
      images={images}
      fileType={fileInfo?.fileType}
    />
  )
}
