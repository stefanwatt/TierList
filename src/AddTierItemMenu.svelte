<script lang="ts">
  import { clickOutside } from "./lib/utils";
  import { scale } from "svelte/transition";
  import { tierItems } from "./tier";
  import { displayAddItemMenu } from "./store";
  import { v4 as uuid } from "uuid";

  const addTextItem = () => {
    const newItem = {
      id: uuid(),
      label: "F",
    };
    $tierItems = [...$tierItems, newItem];
    $displayAddItemMenu = false;
  };
  const addImageItem = () => {
    const newItem = {
      id: uuid(),
      imgUrl: "https://placeimg.com/192/192/people",
    };
    $tierItems = [...$tierItems, newItem];
    $displayAddItemMenu = false;
  };

  const onClickOutside = () => {
    console.log("clicked outside");
    $displayAddItemMenu = false;
  };
</script>

<ul
  transition:scale={{ duration: 300, delay: 0, opacity: 0.5 }}
  use:clickOutside={onClickOutside}
  class="menu text-primary-content bg-primary w-36 rounded-box"
>
  <li>
    <button on:click={addTextItem}>
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z"
        />
      </svg>Text</button
    >
  </li>
  <li>
    <button on:click={addImageItem}>
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20,5A2,2 0 0,1 22,7V17A2,2 0 0,1 20,19H4C2.89,19 2,18.1 2,17V7C2,5.89 2.89,5 4,5H20M5,16H19L14.5,10L11,14.5L8.5,11.5L5,16Z"
        />
      </svg>
      Image<button /></button
    >
  </li>
</ul>
