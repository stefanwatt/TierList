<script lang="ts">
  import { v4 as uuid } from "uuid";
  import autoAnimate from "@formkit/auto-animate";
  import Send from "../lib/icons/Send.svelte";
  import { tiers, tierItems } from "../tiers/store";
  import { Circle3 } from "svelte-loading-spinners";
  import Plus from "../lib/icons/Plus.svelte";
  let searchTerm = "";
  let loading = false;
  let images = [];

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    },
  };
  const searchForImages = async () => {
    loading = true;
    const res = await fetch(
      `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`,
      options
    );
    const json = await res.json();
    images = json.value;
    loading = false;
  };

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    searchForImages();
  };

  const addImageItem = (item) => {
    console.log("adding item");
    const newItem = {
      id: uuid(),
      imgUrl: item.url,
    };
    $tierItems = [...$tierItems, newItem];
  };
</script>

<form class="flex items-center px-1 bg-base-300 rounded-md" on:submit={submit}>
  <input
    tabindex={$tiers.length + 1}
    bind:value={searchTerm}
    placeholder="search for image"
    type="text"
    class="input w-full bg-base-300 focus:outline-none"
  />
  <button type="submit"><Send /></button>
</form>
<div use:autoAnimate={{ duration: 500 }}>
  {#if loading}
    <div class="flex justify-center">
      <Circle3 size="60" unit="px" duration="1s" />
    </div>
  {:else}
    <div class="flex flex-wrap mt-2">
      {#each images as image}
        <div class="avatar h-16 w-16 m-1">
          <div
            on:click={() => {
              addImageItem(image);
            }}
            class="cursor-pointer absolute top-auto left-auto w-1/2 h-1/2 opacity-50 text-white hover:opacity-100 hover:w-full hover:h-full transition-all duration-300"
          >
            <Plus size={"100%"} />
          </div>
          <div class="h-full rounded">
            <img
              class="text-4xl flex justify-center items-center border-primary-content border-2"
              src={image.url}
              alt="💩"
            />
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
