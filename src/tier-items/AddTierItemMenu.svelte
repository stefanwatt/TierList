<script lang="ts">
  import { clickOutside } from "../lib/utils";
  import autoAnimate from "@formkit/auto-animate";
  import { scale } from "svelte/transition";
  import { tierItems } from "../tiers/store";
  import { displayAddItemMenu } from "../store";
  import { v4 as uuid } from "uuid";
  import { onMount } from "svelte";
  import Image from "../lib/icons/Image.svelte";
  import Text from "../lib/icons/Text.svelte";
  import Send from "../lib/icons/Send.svelte";

  let newItemLabel = "";
  let newItemUrl = "";
  let chosenType: "text" | "image";

  const addTextItem = () => {
    const newItem = {
      id: uuid(),
      label: newItemLabel,
    };
    $tierItems = [...$tierItems, newItem];
    $displayAddItemMenu = false;
  };
  let errorMessage;
  const invalidImageUrlErrorMessage = "Not a valid image url!";
  const addImageItem = async () => {
    const res = await fetch(newItemUrl);
    if (!res.headers.get("content-type").startsWith("image")) {
      errorMessage = invalidImageUrlErrorMessage;
      return;
    }
    errorMessage = null;
    const newItem = {
      id: uuid(),
      imgUrl: newItemUrl,
    };
    $tierItems = [...$tierItems, newItem];
    $displayAddItemMenu = false;
  };

  const onClickOutside = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("menuBtn")) return;
    else $displayAddItemMenu = false;
  };

  const chooseTextItem = () => {
    chosenType = "text";
  };

  const chooseImageItem = () => {
    chosenType = "image";
  };

  const submit = (e) => {
    e.preventDefault();
    if (chosenType === "text") addTextItem();
    else addImageItem();
  };

  const focus = (node: HTMLInputElement) => {
    node.focus();
  };

  onMount(() => {
    document.addEventListener("keyup", (e) => {
      if (!(e.key === "Escape")) return;
      $displayAddItemMenu = false;
    });
  });
</script>

<ul
  use:autoAnimate={{ duration: 200 }}
  use:clickOutside={onClickOutside}
  transition:scale={{ duration: 300, delay: 0, opacity: 0.5 }}
  class="menu text-primary-content bg-primary rounded-box"
>
  {#if !chosenType}
    <li>
      <button class="menuBtn" on:click={chooseTextItem}> <Text />Text</button>
    </li>
    <li>
      <button class="menuBtn" on:click={chooseImageItem}>
        <Image />
        Image<button /></button
      >
    </li>
  {:else}
    <li>
      <form class="bg-transparent" on:submit={submit}>
        <div use:autoAnimate={{ duration: 200 }} class="flex flex-col w-full">
          <div class="flex items-center">
            {#if chosenType === "text"}
              <input
                use:focus
                bind:value={newItemLabel}
                required
                placeholder="enter label"
                maxlength="8"
                class="input w-full focus:bg-transparent focus:outline-none bg-transparent"
              />
            {:else}
              <input
                use:focus
                bind:value={newItemUrl}
                placeholder="enter url"
                class="input w-full focus:bg-transparent focus:outline-none bg-transparent"
              />
            {/if}
            <span class="ml-1"
              ><button type="submit">
                <Send />
              </button>
            </span>
          </div>
          {#if errorMessage}
            <p class="text-error text-xs px-2">{errorMessage}</p>
          {/if}
        </div>
      </form>
    </li>
  {/if}
</ul>
