type SVGProps = {
  className?: string
}

export function Upload({ className }: SVGProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M13.5151 10.0175V12.5286C13.5151 12.8616 13.3829 13.181 13.1474 13.4165C12.9119 13.6519 12.5925 13.7842 12.2595 13.7842H3.47043C3.13743 13.7842 2.81807 13.6519 2.5826 13.4165C2.34713 13.181 2.21484 12.8616 2.21484 12.5286V10.0175"
        stroke="#A7A7A7"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0045 5.62298L7.86553 2.48401L4.72656 5.62298"
        stroke="#A7A7A7"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.86523 2.48401V10.0175"
        stroke="#A7A7A7"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
