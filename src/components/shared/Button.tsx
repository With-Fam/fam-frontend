import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary'
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button = ({
  className,
  disabled,
  variant = 'default',
  ..._rest
}: Props): JSX.Element => (
  <button
    disabled={disabled}
    className={twMerge(
      'w-auto rounded-full px-10 py-4 text-2xl',
      disabled && 'cursor-not-allowed opacity-20',
      (() => {
        switch (variant) {
          default:
          case 'default':
            return 'bg-black text-white'
          case 'secondary':
            return 'bg-grey-light text-black'
          case 'tertiary':
            return 'text-black'
        }
      })(),
      className
    )}
    {..._rest}
  />
)
