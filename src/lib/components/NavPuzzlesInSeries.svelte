<script>
	import { solved } from '$lib/stores/stores.svelte';

	let { puzzlesOfSeries, classes } = $props();
</script>

<div class={[classes]}>
	{#each puzzlesOfSeries as puzzle, idx}
		<a
			class="flex flex-col items-center justify-center gap-1 text-center text-sm"
			href={`./${puzzle.slug}`}
			><div
				class={[
					'h-3 w-3 rounded-full border-2 border-black',
					solved[idx] ? 'bg-green-500' : 'bg-white'
				]}
			></div>
			<p class="text-center">{puzzle.subtitle}</p></a
		>
	{/each}
</div>
