<script lang="ts">
  import { toJpeg, toPng, toSvg } from "html-to-image";
  import download from "downloadjs";

  const exportAsImage = async (format: "svg" | "png" | "jpeg") => {
    const node = document.getElementById("tiers");
    let dataURL: string;
    switch (format) {
      case "svg":
        dataURL = await toSvg(node);
        break;
      case "png":
        dataURL = await toPng(node);
        break;
      case "jpeg":
        dataURL = await toJpeg(node);
        break;
      default:
        throw new Error("no image format selected");
    }
    download(dataURL, `tier-list.${format}`);
  };
</script>

<label for="exportModal" class="modal-button w-10 h-10">
  <svg style="width:100%;height:100%" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z"
    />
  </svg>
</label>

<input type="checkbox" id="exportModal" class="modal-toggle" />
<label for="exportModal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <label
      for="exportModal"
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <h3 class="text-lg font-bold">Export as Image</h3>
    <p class="py-4">Which image format would you like to use?</p>
    <div class="flex">
      <button
        on:click={() => {
          exportAsImage("png");
        }}
        class="btn btn-primary">PNG</button
      >
      <button
        on:click={() => {
          exportAsImage("svg");
        }}
        class="btn btn-primary mx-2">SVG</button
      ><button
        on:click={() => {
          exportAsImage("jpeg");
        }}
        class="btn btn-primary">JPEG</button
      >
    </div>
  </label>
</label>
