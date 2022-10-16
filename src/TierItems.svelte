<script lang="ts">
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import type { TierItem } from "./tier";
  import { tierItems, tiers } from "./tier";

  const flipDurationMs = 0;

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
  const addItem = () => {
    if (newItemLabel.trim() === "") return;
    $tierItems = [
      ...$tierItems,
      { id: $tierItems.length + 1, label: newItemLabel },
    ];
    newItemLabel = "";
  };
  const removeItem = (id: number) => {
    $tierItems = $tierItems.filter((item) => item.id !== id);
  };
  const clearAll = () => {
    $tierItems = [];
  };
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
    class="h-full w-full p-4 bg-base-100 "
    use:dndzone={{ items: $tierItems, flipDurationMs, type: "tier-items" }}
    on:consider={onDrag}
    on:finalize={onDrop}
  >
    {#each $tierItems as item (item.id)}
      <div
        animate:flip={{ duration: flipDurationMs }}
        class="badge badge-primary p-4 m-1 cursor-pointer"
      >
        <span>
          {item.label}
        </span>
        <span
          on:click={() => {
            removeItem(item.id);
          }}
          class="ml-2"
        >
          <svg class="w-4 h-4 cursor-default" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
            />
          </svg>
        </span>
      </div>
    {/each}
  </div>
  <div class="bg-base-100 p-1">
    <input
      tabindex={$tiers.length + 1}
      on:keydown={handleInput}
      bind:value={newItemLabel}
      placeholder="add item"
      type="text"
      class="input w-full bg-base-300"
    />
  </div>
</div>
