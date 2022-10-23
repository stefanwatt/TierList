<script lang="ts">
  import TierItem from "./TierItem.svelte";
  import TierItemsHeader from "./Header.svelte";
  import TierItemsContent from "./Content.svelte";
  import TierItemsFooter from "./Footer.svelte";
  import autoAnimate from "@formkit/auto-animate";
</script>

<div
  use:autoAnimate={{ duration: 300 }}
  class="h-full py-2 ml-2 flex flex-col justify-between transition-all duration-300"
>
  <TierItemsHeader />
  <TierItemsContent />
  <TierItemsFooter />
</div>
