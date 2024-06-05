type ConfirmTitleProps = {
  children: string
}

const ConfirmTitle = ({ children }: ConfirmTitleProps): JSX.Element => (
  <p className="text-xs capitalize text-grey">{children}</p>
)

export default ConfirmTitle
