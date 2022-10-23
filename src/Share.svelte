<script lang="ts">
  import { toJpeg } from "html-to-image";

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const uploadToImgur = async () => {
    const dataUrl = await toJpeg(document.getElementById("tiers"));
    const file = dataURLtoFile(dataUrl, "tier-list.jpeg");
    return console.log(dataUrl);
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`
    );
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "file");
    formData.append("name", "tier-list.jpeg");
    formData.append("title", "Tier List");

    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    });
    console.log(res);
  };
</script>

<label for="shareModal" class="modal-button w-10 h-10">
  <svg style="width:100%;height:100%" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
    />
  </svg>
</label>

<input type="checkbox" id="shareModal" class="modal-toggle" />
<label for="shareModal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <label for="shareModal" class="btn btn-sm btn-circle absolute right-2 top-2"
      >✕</label
    >
    <h3 class="text-lg font-bold">Share your tierlist</h3>
    <button
      on:click={() => {
        uploadToImgur();
      }}
      class="btn btn-primary mt-4"
    >
      <img
        class="h-6"
        src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Imgur_logo.svg"
        alt="Imgur"
      />
    </button>
  </label>
</label>
