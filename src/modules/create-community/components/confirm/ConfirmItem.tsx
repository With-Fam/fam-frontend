// Types
type ConfirmItemProps = {
  children: React.ReactNode
  label: string
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ConfirmItem = ({ children, label }: ConfirmItemProps): JSX.Element => (
  <div className="mt-2">
    <p className="text-xs uppercase text-grey">{label}</p>
    <p className="text-sm">{children}</p>
  </div>
)

export default ConfirmItem
