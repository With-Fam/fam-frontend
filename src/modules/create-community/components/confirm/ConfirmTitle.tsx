// Types
type ConfirmTitleProps = {
  children: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ConfirmTitle = ({ children }: ConfirmTitleProps): JSX.Element => (
  <p className="text-xs capitalize text-grey">{children}</p>
)

export default ConfirmTitle
