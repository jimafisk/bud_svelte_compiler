<script>
	export let title = "Blog title";
  let author = "jim";
  let date = "today";
  let body = "<ul><li>one</li><li>two</li></ul>";
</script>

<h1>{title}</h1>

<p><em>{#if author}Written by {author}{/if}{#if date}&nbsp;on {date}{/if}</em></p>

<p>{@html body}</p>

<p><a href=".">Back home</a></p>
