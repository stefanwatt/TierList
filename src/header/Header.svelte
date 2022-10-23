<script lang="ts">
  import Export from "./Export.svelte";
  import Share from "./Share.svelte";
</script>
    <header class="flex items-center">
      <Export />
      <span class="mx-2" />
      <Share />
      <h1 class="text-6xl text-center font-bold mb-4">
        <input
          onClick="this.select();"
          tabindex="-1"
          type="text"
          class="focus:bg-base-100 text-center bg-transparent focus:outline-none font-black"
          value="My Custom Tier List"
        />
      </h1>
    </header>
