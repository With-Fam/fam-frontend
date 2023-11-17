import { Flex, FlexProps } from '@zoralabs/zord'
import React from 'react'

import { icon } from './Icon.css'
import { IconType, icons } from './icons'

type IconProps = FlexProps & {
  id: IconType
  fill?: `#${string}`
  size?: 'sm' | 'md' | 'lg'
}

export const Icon = ({
  id,
  fill = '#333333',
  size = 'md',
  ..._props
}: IconProps): JSX.Element => {
  const IconSVG = icons[id]

  return (
    <Flex {..._props}>
      <IconSVG fill={fill} className={icon({ size })} />
    </Flex>
  )
}
