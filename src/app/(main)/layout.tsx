import type { PropsWithChildren } from 'react'
import { Navbar, Footer } from '@/components/shared'

const MainLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <>
    <Navbar />
    <main className="grow">{children}</main>
    <Footer />
  </>
)

export default MainLayout
