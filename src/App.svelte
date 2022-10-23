<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import { scale } from "svelte/transition";
  import Tier from "./tiers/Tier.svelte";
  import TierItems from "./tier-items/TierItems.svelte";
  import { defaultTiers, tiers } from "./tiers/store";
  import Controls from "./Controls.svelte";
  import Header from "./header/Header.svelte";
  import Footer from "./footer/Footer.svelte";
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
    <Header />
    <div class="flex">
      <div use:autoAnimate={{ duration: 300 }} id="tiers" class="w-full">
        {#each $tiers as tier (tier.rank)}
          <div
            in:scale={{ duration: 500, delay: 0, opacity: 0.5 }}
            class="w-full h-32 flex my-2 bg-base-100"
          >
            <Tier {tier} />
          </div>
        {/each}
      </div>
      <div class="w-1/3">
        <TierItems />
      </div>
    </div>
    <Controls />
  </div>
  <Footer />
</main>

<style>
  .content {
    flex: 1 0 auto;
  }
</style>
