import { writable } from 'svelte/store'

interface Color {
  rank: number
  color: string
}

export const colors: Color[] = [
  { rank: 1, color: 'FF7F7E' },
  { rank: 2, color: 'FFBF7B' },
  { rank: 3, color: 'FEFF7F' },
  { rank: 4, color: '7EFF80' },
  { rank: 5, color: '7FFFFF' },
  { rank: 6, color: '807FFF' },
  { rank: 7, color: 'FF7FFE' },
]

export const customColors = writable<Color[]>([])
