'use client'
import { useRouter } from 'next/navigation'
import { Paragraph } from '@/stories'
import { usePrivy } from '@privy-io/react-auth'

const SessionExpired = (): JSX.Element => {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  if (!ready || authenticated) {
    return <></>
  }
  return (
    <div className="fixed z-20 flex h-screen w-screen flex-col items-center justify-center bg-black/40">
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
        <Paragraph as="p3" className="mb-4 text-xl font-bold">
          <span className="block leading-7">Your wallet connection</span>
          <span className="block leading-7">with FAM expired</span>
        </Paragraph>
        <Paragraph as="p4" className="mb-4 text-grey">
          We will kindly ask you to login again
        </Paragraph>
        <button
          onClick={() => {
            logout()
            router.refresh()
          }}
          className="rounded-2xl bg-orange px-6 py-2 "
        >
          <Paragraph as="p4" className="text-white">
            OK
          </Paragraph>
        </button>
      </div>
    </div>
  )
}

export default SessionExpired
