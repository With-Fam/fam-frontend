'use client'
// Local Components
import {
  AllDrops,
  BidComponent,
  CommunityActivity,
  CommunityMembers,
  FoundersComponent,
  RecentDrops,
} from '@/components/community'
import { useTabContext } from '@/contexts/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { SDK } from '@/data/subgraph/client'

/*--------------------------------------------------------------------*/

const variants = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

type Props = {
  params: { communityId: string; networkSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getCommunityData(chainId: number, collection: string) {
  const dao = await SDK.connect(chainId)
    .daoOGMetadata({
      tokenAddress: collection.toLowerCase(),
    })
    .then((x) => x.dao)
  console.log('dao::', dao)
  return dao
}

export default function CommunityProfile(_props: Props): JSX.Element {
  const { tab } = useTabContext()

  const chainId = 5 // Hardcoded. Should be passed in from the router

  console.log('_props::', _props)
  const { communityId } = _props.params

  console.log('getCommunityData::', getCommunityData(chainId, communityId))

  let component: JSX.Element = <></>

  switch (tab) {
    case 'home':
    default:
      component = (
        <>
          <BidComponent />
          <FoundersComponent />
          <RecentDrops />
        </>
      )
      break
    case 'drops':
      component = <AllDrops />
      break
    case 'members':
      component = <CommunityMembers />
      break
    case 'activity':
      component = <CommunityActivity />
      break
  }
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        variants={variants}
        transition={{ duration: 0.3 }}
        initial="intial"
        animate="open"
        exit="exit"
      >
        {component}
      </motion.div>
    </AnimatePresence>
  )
}
