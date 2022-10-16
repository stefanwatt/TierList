<script lang="ts">
  import Tier from "./Tier.svelte";
  import TierItems from "./TierItems.svelte";
  import { defaultTiers, tiers } from "./tier";
  import Controls from "./Controls.svelte";
  const addTier = () => {
    const nextTier = defaultTiers[$tiers.length];
    $tiers.push(nextTier);
    $tiers = $tiers;
  };
  const removeTier = () => {
    $tiers = $tiers.slice(0, -1);
  };
</script>

<main class="w-screen h-screen p-4 bg-base-300 flex flex-col">
  <div class="content">
    <h1 class="text-6xl text-center font-bold mb-4">
      <input
        tabindex="-1"
        type="text"
        class="focus:bg-base-100 text-center bg-transparent focus:outline-none font-black"
        value="My Custom Tier List"
      />
    </h1>
    <div class="flex">
      <div class="w-full">
        {#each $tiers as tier}
          <Tier {tier} />
        {/each}
      </div>
      <div class="w-1/3">
        <TierItems />
      </div>
    </div>
    <Controls />
  </div>

  <footer class="text-xl w-full text-center sticky bottom-0">
    <a
      rel="noreferrer"
      target="_blank"
      class="link"
      href="https://en.wikipedia.org/wiki/Tier_list"
    >
      WTF is a tier list???
    </a>
  </footer>
</main>

<style>
  .content {
    flex: 1 0 auto;
  }
  footer {
    flex-shrink: 0;
  }
</style>
