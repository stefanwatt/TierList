<script lang="ts">
  const addImageItem = () => {
  };

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    addImageItem();
  };
</script>

<form on:submit={submit} >

</form>
