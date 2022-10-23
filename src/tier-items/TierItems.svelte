<script lang="ts">
  import TierItem from "./TierItem.svelte";
  import TierItemsHeader from "./Header.svelte";
  import TierItemsContent from "./Content.svelte";
  import TierItemsFooter from "./Footer.svelte";
</script>

<div
  class="h-full py-2 ml-2 flex flex-col justify-between transition-all duration-300"
>
  <TierItemsHeader />
  <TierItemsContent />
  <TierItemsFooter />
</div>

