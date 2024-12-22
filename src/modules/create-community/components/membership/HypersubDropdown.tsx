'use client'

import { Icon } from '@/components/Icon'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Tooltip from '@/components/shared/Tooltip'
import { useCreateCommunityProvider } from '@/contexts/CreateCommunityProvider'
import { Address } from 'viem'
import useOwnerHypersubs from '@/hooks/useOwnerHypersubs'

export default function HypersubDropdown() {
  const { hypersubAddress, setHypersubAddress } = useCreateCommunityProvider()
  const { hypersubs, loading, error } = useOwnerHypersubs()

  return (
    <section className="mt-4 rounded-xl bg-white">
      <div className="w-full space-y-2 px-4">
        <div className="flex items-center gap-1.5">
          <label className="font-abcMedium text-sm">
            Link existing Hypersub
          </label>
          <Tooltip
            id={'revenue-split-tooltip'}
            message="Link any Hypersub that you are the owner of. The Founder split of revenue from memberships will accrue to the Hypersub contract"
            className="!z-[100]"
          >
            <Icon id="helpCircle" fill="#ffffff" />
          </Tooltip>
        </div>
        <Select
          disabled={loading}
          onValueChange={(value: Address) => {
            setHypersubAddress(value)
          }}
        >
          <SelectTrigger
            className={`h-[55px] w-full rounded-xl border-grey ${
              hypersubAddress ? 'text-black' : 'text-grey'
            }`}
          >
            <div className="flex items-center gap-2 text-lg">
              {!hypersubAddress && (
                <Image
                  src={'/assets/images/fam-default-card.jpg'}
                  alt=""
                  width={33}
                  height={33}
                  className="rounded-md"
                />
              )}
              <SelectValue
                placeholder={
                  loading
                    ? 'Loading...'
                    : error
                      ? 'Error loading hypersubs'
                      : 'Select Hypersub'
                }
              />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-grey">
            <SelectGroup>
              {hypersubs.map((sub) => (
                <SelectItem
                  key={sub.id}
                  value={sub.id}
                  className="flex items-center gap-2 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={sub.imageUrl}
                      alt=""
                      width={33}
                      height={33}
                      className="rounded-md"
                    />
                    <span>{sub.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}
