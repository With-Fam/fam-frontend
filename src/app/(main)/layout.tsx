// Types
import type { PropsWithChildren } from 'react'

// Local Components
import { Navbar, Footer } from '@/components/shared'

/*--------------------------------------------------------------------*/

/**
 * Component
 */
const MainLayout = ({ children }: PropsWithChildren): JSX.Element => (
  <>
    <Navbar />
    <main className="grow pt-[80px] sm:pt-[110px]">{children}</main>
    <Footer />
  </>
)

export default MainLayout
