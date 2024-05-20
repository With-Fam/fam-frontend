<<<<<<< HEAD
import { MembershipTypes } from '@/types/create-community'
interface MembershipDataProps {
  title: string
  description: string
  // Avoiding for as it is a reserved word
  // for: string
  market: string
  type: MembershipTypes
}

const MEMBERSHIP_DATA: MembershipDataProps[] = [
  {
    title: 'Daily Auction',
    description: 'Allow people to bid to join your community on a daily basis',
    market: 'Great for communities who want to grow slowly and intentionally',
    type: 'daily',
=======
const MEMBERSHIP_DATA = [
  {
    title: 'Daily Auction',
    description: 'Allow people to bid to join your community on a daily basis',
>>>>>>> origin/main
  },
  {
    title: 'Fixed Price',
    description: 'Let people join your community at any time for a fixed price',
<<<<<<< HEAD
    type: 'fixed',
    market:
      'Well suited to communities who want to be more open and grow quickly',
=======
  },
  {
    description:
      'Great for communities who want to grow slowly and intentionally',
>>>>>>> origin/main
  },
]

export default MEMBERSHIP_DATA
