<script lang="ts">
  import { clickOutside } from "./lib/utils";
  import { scale } from "svelte/transition";
  import { tierItems } from "./tier";
  import { displayAddItemMenu } from "./store";
  import { v4 as uuid } from "uuid";
  import { onMount } from "svelte";

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
  use:clickOutside={onClickOutside}
  transition:scale={{ duration: 300, delay: 0, opacity: 0.5 }}
  class="menu text-primary-content bg-primary rounded-box"
>
  {#if !chosenType}
    <li>
      <button class="menuBtn" on:click={chooseTextItem}>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z"
          />
        </svg>Text</button
      >
    </li>
    <li>
      <button class="menuBtn" on:click={chooseImageItem}>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20,5A2,2 0 0,1 22,7V17A2,2 0 0,1 20,19H4C2.89,19 2,18.1 2,17V7C2,5.89 2.89,5 4,5H20M5,16H19L14.5,10L11,14.5L8.5,11.5L5,16Z"
          />
        </svg>
        Image<button /></button
      >
    </li>
  {:else}
    <li>
      <form on:submit={submit}>
        <div class="flex flex-col">
          <div class="flex items-center">
            {#if chosenType === "text"}
              <input
                use:focus
                bind:value={newItemLabel}
                required
                placeholder="enter label"
                maxlength="8"
                class="input input-ghost w-full focus:bg-transparent focus:outline-none bg-transparent"
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
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M2,21L23,12L2,3V10L17,12L2,14V21Z"
                  />
                </svg>
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
