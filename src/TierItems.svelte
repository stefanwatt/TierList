<script lang="ts">
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import TierItem from "./TierItem.svelte";
  import { tierItems, tiers } from "./tier";
  import { flipDurationMs } from "./lib/constants";
  import plusThick from "./assets/plus-thick.svg";

  const onDrag = (e: any) => {
    try {
      $tierItems = e.detail.items;
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = (e: any) => {
    try {
      $tierItems = e.detail.items;
    } catch (error) {
      console.log(error);
    }
  };

  let newItemLabel = "";

  const handleInput = (e) => {
    if (e.code === "Enter" || e.code === "Tab") {
      e.preventDefault();
      addItem();
    }
  };

  const addTextItem = () => {
    $tierItems = [
      ...$tierItems,
      {
        id: $tierItems.length + 1,
        label: "A",
      },
    ];
  };
  const addImageItem = () => {
    $tierItems = [
      ...$tierItems,
      {
        id: $tierItems.length + 1,
        imgUrl: "https://placeimg.com/192/192/people",
      },
    ];
  };
  const openAddItemMenu = () => {
    displayAddItemMenu = !displayAddItemMenu;
  };
  const clearAll = () => {
    $tierItems = [];
  };
  let displayAddItemMenu = false;
</script>

<div class="h-full py-2 ml-2 flex flex-col justify-between">
  <div class="flex justify-between px-2 bg-base-100 ">
    <h2 class="text-xl">Items:</h2>
    <button class="mt-1" on:click={clearAll}>
      <svg class=" w-6 h-6" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
        />
      </svg>
    </button>
  </div>

  <div
    class="h-full w-full p-4 bg-base-100 grid-cols-3 gap-2 grid"
    use:dndzone={{ items: $tierItems, flipDurationMs, type: "tier-items" }}
    on:consider={onDrag}
    on:finalize={onDrop}
  >
    <div class="relative">
      <button on:click={openAddItemMenu} class="max-h-16">
        <svg style="width:100%;height:100%" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
          />
        </svg>
      </button>
      {#if displayAddItemMenu}
        <ul
          class="menu text-primary-content bg-primary w-36 rounded-box absolute"
        >
          <li>
            <button on:click={addTextItem}>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z"
                />
              </svg>Text</button
            >
          </li>
          <li>
            <button on:click={addImageItem}>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20,5A2,2 0 0,1 22,7V17A2,2 0 0,1 20,19H4C2.89,19 2,18.1 2,17V7C2,5.89 2.89,5 4,5H20M5,16H19L14.5,10L11,14.5L8.5,11.5L5,16Z"
                />
              </svg>
              Image<button /></button
            >
          </li>
        </ul>
      {/if}
    </div>

    {#each [...$tierItems] as item (item.id)}
      <div class="max-h-16" animate:flip={{ duration: flipDurationMs }}>
        <TierItem {item} isDeleteable={false} />
      </div>
    {/each}
  </div>
</div>
