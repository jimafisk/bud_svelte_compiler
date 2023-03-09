<script>
  export let title = "pages title";
  let description = [
    "some desc content",
    "more desc content"
  ];
  let image = {
    src: "/whatever.jpg",
    alt: "something"
  }
</script>

<h1>{title}</h1>

<div>
  {#each description as paragraph}
    <p>{@html paragraph}</p>
  {/each}
</div>

{#if image}
  <div>
    <img src="{image.src}" alt="{image.alt}" />
  </div>
{/if}

<p><a href=".">Back home</a></p>