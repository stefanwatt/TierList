<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";
  import { dndzone } from "svelte-dnd-action";
  import TierItem from "./TierItem.svelte";
  import { tierItems } from "./tier";
  import { flipDurationMs } from "./lib/constants";
  import { displayAddItemMenu, itemTypeToggle } from "./store";
  import AddTierItemMenu from "./AddTierItemMenu.svelte";
  import Text from "./lib/icons/Text.svelte";
  import Image from "./lib/icons/Image.svelte";

  const onDrag = (e: any) => {
    if (!e.detail.info?.id) return;
    $tierItems = e.detail.items;
  };

  const onDrop = (e: any) => {
    if (!e.detail.info?.id) return;
    $tierItems = e.detail.items;
  };

  const clearAll = () => {
    $tierItems = [];
  };

  const onClickAddItem = (event) => {
    $displayAddItemMenu = true;
    event.stopPropagation();
  };
  $: itemTypeToggleIcon = $itemTypeToggle ? Text : Image;
</script>

<div
  class="h-full py-2 ml-2 flex flex-col justify-between transition-all duration-300"
>
  <div class="flex justify-between px-2 bg-base-100 relative">
    <h2 class="text-xl">Items:</h2>
    {#if $displayAddItemMenu}
      <div id="tierItemMenu" class="absolute z-10 top-8 left-0 w-full p-2">
        <AddTierItemMenu />
      </div>
    {/if}
    <div class="flex p-1">
      <div class="flex items-center">
        <button on:click={onClickAddItem} class="h-6 w-6">
          <svg style="width:100%;height:100%" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
            />
          </svg>
        </button>
      </div>
      <span class="mx-1" />
      <button on:click={clearAll}>
        <svg class="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
          />
        </svg>
    </div>
  </div>

  <div class="bg-base-100 p-2 flex justify-start">
    <span class="label-text mr-2">Type:</span>
    <input
      type="checkbox"
      class="toggle toggle-primary"
      bind:checked={$itemTypeToggle}
    />
    <span class="ml-2">
      <svelte:component this={itemTypeToggleIcon} />
    </span>
  </div>
  <div
    class="h-full w-full p-4 bg-base-100 grid grid-flow-dense grid-cols-3 auto-rows-min gap-2"
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
        <TierItem {item} isDeleteable={false} />
      </div>
    {/each}
  </div>
</div>

<style>
  #tierItemMenu {
    right: -2rem;
  }
</style>
