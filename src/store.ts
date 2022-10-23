import { derived, writable } from "svelte/store";

export const displayAddItemMenu = writable(false)
export const itemTypeToggle = writable(false)
export const selectedItemType = derived(itemTypeToggle, $itemTypeToggle => $itemTypeToggle?"text":"image")
