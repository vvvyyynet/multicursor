<script>
	let { data, children } = $props();

	import { solved } from '$lib/stores/stores.svelte';
	data.setsList.forEach((set) => {
		solved[set] = Array(data.sets[set].puzzles.length).fill(false);
	});
</script>

<!-- {#each solved as s}
	<p>{s}</p>
{/each} -->
<div class="dotted-bg absolute left-0 h-full w-full">
	{@render children()}
</div>

<style>
	.dotted-bg {
		background-size: 15px 15px;
		background-image: radial-gradient(#36363a 1px, #0000 0);
		/* background-color: #1e1e22; */
	}
</style>
