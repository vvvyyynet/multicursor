<script>
	let { data, children } = $props();

	import { solved } from '$lib/stores/stores.svelte';
	data.setsList.forEach((set) => {
		solved[set] = Array(data.puzzles[set].puzzles.length).fill(false);
	});
</script>

{#each solved as s}
	<p>{s}</p>
{/each}

{@render children()}
