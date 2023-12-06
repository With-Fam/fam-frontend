// Types
type ConfirmCheckboxProps = {
  children: React.ReactNode
}

/*--------------------------------------------------------------------*/

/**
 * Component
 */

const ConfirmCheckbox = ({ children }: ConfirmCheckboxProps): JSX.Element => (
  <div className="mb-3 text-left">
    <label htmlFor="" className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 border border-solid border-grey"
      />
      <span className="ml-2 text-grey">{children}</span>
    </label>
  </div>
)

export default ConfirmCheckbox
