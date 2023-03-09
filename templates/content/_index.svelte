<script>
	export let title;
	let intro = [
		"first thing",
		"second thing"
	]
</script>

<h1>Homepage title</h1>

<section id="intro">
	{#each intro as paragraph}
		<p>{@html paragraph}</p>
	{/each}
</section>