import { writable } from "svelte/store"

export interface TierItem {
  id: number
  label: string
}
export interface Tier {
  label: string
  rank: number
  items: TierItem[]
}

export const defaultTiers: Tier[] = [
  {
    label: 'Click',
    rank: 1,
    items: [],
  },
  { label: 'the', rank: 2, items: [] },
  { label: 'labels', rank: 3, items: [] },
  { label: 'to', rank: 4, items: [] },
  { label: 'edit', rank: 5, items: [] },
  { label: 'E', rank: 6, items: [] },
  { label: 'F', rank: 7, items: [] },
]

export const tiers = writable<Tier[]>(defaultTiers.slice(0, -2))

export const tierItems = writable<TierItem[]>([])
