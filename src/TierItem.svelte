<script lang="ts">
  export let item,
    isDeleteable = false;
  import { tierItems, type TextTierItem, type ImgTierItem } from "./tier";
  const removeItem = (id: number) => {
    $tierItems = $tierItems.filter((item) => item.id !== id);
  };
</script>

<div class="cursor-pointer h-full">
  <div class="avatar h-full">
    <div class="h-full rounded">
      {#if item?.imgUrl}
        <img src={item.imgUrl} alt="foo" />
      {:else}
        <div
          class="flex justify-center h-full flex-col bg-gray-200 text-black text-md font-bold"
        >
          <div class="text-center font-mono">
            {item.label}
          </div>
        </div>
      {/if}
    </div>
  </div>
  {#if isDeleteable}
    <button
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
    </button>
  {/if}
</div>
