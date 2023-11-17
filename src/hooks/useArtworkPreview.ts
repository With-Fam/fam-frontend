import { useCallback, useEffect, useMemo, useState } from 'react'

import { OrderedTraits } from '@/components/create-community/artwork/TraitsAccordian'

import { ImageProps } from './useArtworkUpload'

export interface UseArtworkPreviewProps {
  orderedLayers: OrderedTraits
  images?: ImageProps[]
}

export interface ImagesByTraitProps {
  trait: string
  images: ImageProps[]
}

export interface SelectedTraitsProps {
  picker: string
  trait: string
  url?: string
}

interface LayerTraitProp extends SelectedTraitsProps {
  uri: string
  content: unknown
}

export type UseArtworkPreviewHook = (_props: UseArtworkPreviewProps) => {
  selectedTraits?: SelectedTraitsProps[]
  randomise: () => void
}

export const useArtworkPreview: UseArtworkPreviewHook = ({
  images,
  orderedLayers,
}) => {
  /*

    init
    - organize images by trait
    - compose layers
    - set initial selected traits (random selection)

   */

  const imagesByTrait = useMemo(() => {
    if (!images) return []

    return images.reduce((acc: ImagesByTraitProps[] = [], image) => {
      const trait = image.trait
      const index = acc.findIndex((e: ImagesByTraitProps) => e?.trait === trait)
      // const propertyTrait = orderedLayers.filter((item) => item.trait === image.trait)[0]
      const propertyTrait = orderedLayers.filter(
        (item) =>
          item?.trait?.replace(/\s/g, '') === image?.trait?.replace(/\s/g, '')
      )?.[0]
      const orderedIndex = orderedLayers.indexOf(propertyTrait)

      if (index === -1) {
        acc[orderedIndex] = { trait, images: [image] }
      } else {
        acc[index]?.images.push(image)
      }
      return acc
    }, [])
  }, [images, orderedLayers])

  const layers = useMemo(() => {
    if (!imagesByTrait) return []

    return imagesByTrait.map((layer: ImagesByTraitProps) => {
      const trait = layer.trait?.replace(/^\d+-/, '')
      return { trait, images: layer.images }
    })
  }, [imagesByTrait])

  const [selectedTraits, setSelectedTraits] = useState<SelectedTraitsProps[]>(
    []
  )

  const randomiseTraits = useCallback(() => {
    setSelectedTraits(
      layers.map((layer: ImagesByTraitProps): LayerTraitProp => {
        const random = Math.floor(Math.random() * layer.images.length)

        return {
          picker: 'random',
          trait: layer.trait,
          uri: layer.images[random].uri,
          url: layer.images[random].url,
          content: layer.images[random].content,
        }
      })
    )
  }, [layers])

  useEffect(() => {
    randomiseTraits()
  }, [randomiseTraits])

  return {
    randomise: randomiseTraits,
    selectedTraits,
  }
}
