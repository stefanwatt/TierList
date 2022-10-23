<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import { tierItems } from "../tiers/store";
  import { scale } from "svelte/transition";
  import { dndzone } from "svelte-dnd-action";
  import { flipDurationMs } from "../lib/constants";
  import { flip } from "svelte/animate";
  import TierItem from "./TierItem.svelte";

  const onDrag = (e: any) => {
    if (!e.detail.info?.id) return;
    $tierItems = e.detail.items;
  };

  const onDrop = (e: any) => {
    if (!e.detail.info?.id) return;
    $tierItems = e.detail.items;
  };
</script>

<div
  use:autoAnimate={{ duration: 300 }}
  class="h-full w-full p-4 bg-base-100 grid grid-flow-dense grid-cols-3 auto-rows-min gap-2 my-2"
  use:dndzone={{ items: $tierItems, flipDurationMs, type: "tier-items" }}
  on:consider={onDrag}
  on:finalize={onDrop}
>
  {#each $tierItems as item (item.id)}
    <div
      in:scale={{ duration: 500, delay: 0, opacity: 0.5 }}
      class="h-16 w-16"
      animate:flip={{ duration: flipDurationMs }}
    >
      <TierItem {item} />
    </div>
  {/each}
</div>
