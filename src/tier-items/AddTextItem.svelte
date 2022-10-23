<script lang="ts">
  import { v4 as uuid } from "uuid";
  import { tiers, tierItems } from "../tiers/store";
  import Send from "../lib/icons/Send.svelte";

  let newItemLabel = "";
  const addTextItem = () => {
    const newItem = {
      id: uuid(),
      label: newItemLabel,
    };
    $tierItems = [...$tierItems, newItem];
    newItemLabel = "";
  };
  const handleInput = (e: KeyboardEvent) => {
    if (e.code === "Enter" || e.code === "Tab") {
      e.preventDefault();
      addTextItem();
    }
  };
  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    addTextItem();
  };
</script>

<form class="flex items-center px-1 bg-base-300 rounded-md" on:submit={submit}>
  <input
    tabindex={$tiers.length + 1}
    on:keydown={handleInput}
    bind:value={newItemLabel}
    placeholder="add item"
    type="text"
    class="input w-full bg-base-300 focus:outline-none"
  />
  <button type="submit"><Send /></button>
</form>
