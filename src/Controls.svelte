<script lang="ts">
  import { defaultTiers, tierItems, tiers } from "./tier";
  const addTier = () => {
    const nextTier = defaultTiers[$tiers.length];
    $tiers.push(nextTier);
    $tiers = $tiers;
  };
  const removeTier = () => {
    const lastTierItem = $tiers[$tiers.length - 1];
    $tierItems = [...$tierItems, ...lastTierItem.items];
    lastTierItem.items = [];
    $tiers = $tiers.slice(0, -1);
  };
</script>

<div class="flex justify-center">
  <button
    id="minusBtn"
    on:click={removeTier}
    disabled={$tiers.length === 1}
    class:text-red-400={$tiers.length > 1}
    class:text-gray-400={$tiers.length === 1}
    class="w-10 h-10 mx-4"
  >
    <svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      />
    </svg>
  </button>
  <button
    on:click={addTier}
    disabled={$tiers.length === 7}
    id="plusBtn"
    class:text-green-400={$tiers.length < 7}
    class:text-gray-400={$tiers.length === 7}
    class="w-10 h-10"
    ><svg style="width:100%;height:100%" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      />
    </svg></button
  >
</div>
