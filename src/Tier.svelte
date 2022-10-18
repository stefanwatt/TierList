<script lang="ts">
  export let tier: Tier = { label: "S", rank: 1, items: [] };
  import { flip } from "svelte/animate";
  import { colors } from "./colors";
  import type { Tier } from "./tier";
  import TierItem from "./TierItem.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flipDurationMs } from "./lib/constants";

  const setBgColor = (node: HTMLElement) => {
    node.style.backgroundColor =
      "#" + colors.find((color) => color.rank === tier.rank).color;
  };

  const onDrag = (e: any) => {
    try {
      tier.items = e.detail.items;
    } catch (error) {
      console.log(error);
    }
  };
  const onDrop = (e: any) => {
    try {
      tier.items = e.detail.items;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="w-full h-32 flex my-2 bg-base-100">
  <span
    use:setBgColor
    class="w-40 h-full flex flex-col justify-center text-center text-black p-2"
  >
    <input
      onClick="this.select();"
      tabindex={tier.rank}
      type="text"
      class="focus:border-b-black focus:border-b-2 text-center bg-transparent focus:outline-none font-black text-2xl"
      value={tier.label}
    />
  </span>
  <section
    class="h-full w-full p-4 flex flex-wrap"
    use:dndzone={{ items: tier.items, flipDurationMs, type: "tier-items" }}
    on:consider={onDrag}
    on:finalize={onDrop}
  >
    {#each tier.items as item (item.id)}
      <div animate:flip={{ duration: flipDurationMs }} class="mx-1 h-full">
        <TierItem {item} />
      </div>
    {/each}
  </section>
</div>
