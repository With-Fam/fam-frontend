import { Icon } from '@/components/Icon'
import Image from 'next/image'

const Header = () => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full md:h-16 md:w-16">
          <Image src="/assets/images/community/m4.jpeg" alt="" layout="fill" />
        </div>
        <div className="space-y-1">
          <p className="text-md font-abc md:text-2xl">PC Music Club</p>
          <p className="text-md font-abc text-grey md:hidden">23,450 members</p>
        </div>
      </div>
      <Icon id="settings" fill="#ffffff" />
    </section>
  )
}

export default Header
