import React, { PropsWithChildren } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface Props {
  id: string
  message: string
  link?: string
  className?: string
  tipClasses?: string
}

const Tooltip = ({
  children,
  message,
  id,
  className,
  tipClasses = '',
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={className}
      data-tooltip-id={id}
      data-tooltip-content={message}
      data-tooltip-delay-hide={100}
    >
      {children}
      <ReactTooltip
        id={id}
        events={['hover']}
        className={`!w-[225px] !rounded-xl border !bg-white !text-left !font-abc !text-grey ${tipClasses}`}
        place="right"
      />
    </div>
  )
}

export default Tooltip
