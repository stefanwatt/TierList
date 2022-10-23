<script lang="ts">
  import { scale } from "svelte/transition";
  import { selectedItemType } from "../store";
  import AddTextItem from "./AddTextItem.svelte";
  import AddImageItem from "./AddImageItem.svelte";
  import autoAnimate from "@formkit/auto-animate";
</script>

<div use:autoAnimate={{ duration: 500 }} class="bg-base-100 p-1">
  {#if $selectedItemType === "text"}
    <div
      in:scale={{ duration: 300, delay: 0, opacity: 0.5 }}
      class="bg-base-300 rounded-md"
    >
      <AddTextItem />
    </div>
  {:else if $selectedItemType === "image"}
    <div in:scale={{ duration: 300, delay: 0, opacity: 0.5 }}>
      <AddImageItem />
    </div>
  {/if}
</div>
