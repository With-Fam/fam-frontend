import { useEffect } from 'react'
import { ImageProps } from '@/hooks'
import type {
  ArtworkFormValues,
  FormStoreState,
} from '@/modules/create-community'
import { Trait, TraitProps } from './Trait'
import { DNDList } from '@/components/create-community/artwork/TraitsAccordian/DNDList'

export interface TraitsAccordianProps
  extends Pick<FormStoreState, 'orderedLayers' | 'setOrderedLayers'> {
  artwork: ArtworkFormValues['artwork']
  images?: ImageProps[]
}

export function TraitsAccordian({
  artwork,
  orderedLayers,
  setOrderedLayers,
}: TraitsAccordianProps): JSX.Element {
  useEffect(() => {
    if (artwork && orderedLayers.length < 1) setOrderedLayers(artwork)
  }, [artwork, orderedLayers, setOrderedLayers])

  return (
    <div className="col-span-1 space-y-2">
      <DNDList
        items={orderedLayers as Array<TraitProps>}
        ListItem={Trait}
        onChange={setOrderedLayers}
      >
        {orderedLayers.map((orderedLayer, idx) => (
          <Trait
            id={orderedLayer.trait}
            key={orderedLayer.trait}
            index={idx}
            {...orderedLayer}
          />
        ))}
      </DNDList>
    </div>
  )
}
