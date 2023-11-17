import { Flex } from '@zoralabs/zord'
import React, { ReactNode } from 'react'

import {
  confirmRemoveHeadingStyle,
  confirmRemoveHelper,
} from '@/components/forms/styles.css'
import { Icon } from '@/components/Icon'
import { Spinner } from '@/components/Spinner'

type SuccessModalContentProps = {
  title: string
  subtitle: string
  content?: ReactNode
  actions?: ReactNode
  success?: boolean
  pending?: boolean
}

const SuccessModalContent: React.FC<SuccessModalContentProps> = ({
  title,
  subtitle,
  content,
  actions,
  success,
  pending,
}) => {
  return (
    <Flex direction={'column'} align={'center'}>
      {success && (
        <Flex
          align={'center'}
          justify={'center'}
          height={'x8'}
          width={'x8'}
          mb={'x6'}
          borderRadius={'round'}
          backgroundColor={'positive'}
        >
          <Icon id="check" fill="#7a7a7a" />
        </Flex>
      )}

      {pending && <Spinner mx={'x4'} />}

      <Flex className={confirmRemoveHeadingStyle} mb={'x2'}>
        {title}
      </Flex>

      <Flex textAlign={'center'} className={confirmRemoveHelper}>
        {subtitle}
      </Flex>

      {content && <Flex>{content}</Flex>}

      {actions && <Flex mt={'x4'}>{actions}</Flex>}
    </Flex>
  )
}

export { SuccessModalContent }
