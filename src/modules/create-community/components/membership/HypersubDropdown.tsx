'use client'

import Image from 'next/image'
import { InfoIcon as InfoCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Hypersub {
  id: string
  title: string
  imageUrl: string
}

// Sample data - replace with your actual data
const hyperSubs: Hypersub[] = [
  {
    id: '1',
    title: 'Fam Club',
    imageUrl: '/placeholder.svg?height=24&width=24',
  },
  {
    id: '2',
    title: 'Real Friends',
    imageUrl: '/placeholder.svg?height=24&width=24',
  },
]

export default function HypersubDropdown() {
  return (
    <div className="w-full max-w-[400px] space-y-2">
      <div className="flex items-center gap-1.5">
        <label className="text-sm font-medium">Link existing Hypersub</label>
        <InfoCircle className="text-muted-foreground h-4 w-4" />
      </div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Hypersub" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {hyperSubs.map((sub) => (
              <SelectItem
                key={sub.id}
                value={sub.id}
                className="flex items-center gap-2 py-2"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={sub.imageUrl}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded"
                  />
                  <span>{sub.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
