<script lang="ts">
  type FontSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  import {
    tierItems,
    type TextTierItem,
    type ImgTierItem,
    type Tier,
    tiers,
  } from "../tiers/store";
  export let item,
    fontSize: FontSize = "xs",
    tier: Tier;
  const removeItem = (id: number) => {
    $tierItems = $tierItems.filter((item) => item.id !== id);
    if (!tier) return;
    const updatedTierItems = tier.items.filter(({ id }) => item.id !== id);
    $tiers = $tiers.map((t) => {
      if (tier.rank !== t.rank) return t;
      return { ...tier, items: updatedTierItems };
    });
  };
  $: removeIconSize = !!tier ? 6 : 4;
  let showRemoveIcon;
</script>

<div
  on:mouseenter={() => {
    showRemoveIcon = true;
  }}
  on:mouseleave={() => {
    showRemoveIcon = false;
  }}
  class="cursor-pointer h-full relative"
>
  <button
    on:click={() => {
      removeItem(item.id);
    }}
    class:block={showRemoveIcon}
    class:hidden={!showRemoveIcon}
    class=" ml-2 absolute z-10 right-1 top-1 cursor-default"
  >
    <svg
      class:w-6={!!tier}
      class:h-6={!!tier}
      class:w-4={!tier}
      class:h-4={!tier}
      class="cursor-default"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
      />
    </svg>
  </button>
  <div class="avatar h-full">
    <div class="h-full rounded">
      {#if item?.imgUrl}
        <img src={item.imgUrl} alt="foo" />
      {:else}
        <div
          class="flex justify-center h-full flex-col bg-gray-200 text-black text-{fontSize} font-bold"
        >
          <div class="text-center font-mono">
            {item.label}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
