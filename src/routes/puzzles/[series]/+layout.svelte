<script>
	import { solved } from '$lib/stores/stores.svelte';
	import { onMount } from 'svelte';
	let { data, children } = $props();

	let descOfSeries = $derived(data.puzzles?.[data.slugOfSeries].desc);
	let puzzlesOfSeries = $derived(data.puzzles?.[data.slugOfSeries].puzzles);
	let allSlugs = $derived(puzzlesOfSeries.map((puzzle) => puzzle.slug));

	// Series Stats
	onMount(() => {
		solved[data.slugOfSeries] = Array(puzzlesOfSeries.length).fill(false);
	});
	// $inspect(solved['editor-basics'])
	let nSolved = $derived(solved[data.slugOfSeries].filter(Boolean).length);
</script>

<div>
	<h1 class="h1">{descOfSeries.title1}</h1>
	<h2 class="h2">{descOfSeries.text}</h2>

	<p>solved: {nSolved}</p>

	<!-- Navigation -->
	<div class="mx-auto mb-5 flex w-1/2 flex-col gap-5">
		<div class="m-5 flex flex-col border p-2">
			<!-- <p class="m-4 text-center text-xl">Select a Puzzle:</p> -->
			<div class="flex w-full justify-center gap-10">
				{#each puzzlesOfSeries as puzzle, idx}
					<a
						class="flex flex-col items-center justify-center gap-2 text-center"
						href={`./${puzzle.slug}`}
						><div
							class={[
								'h-5 w-5 rounded-full border-2 border-black',
								solved[idx] ? 'bg-green-500' : 'bg-white'
							]}
						></div>
						<p class="text-center">{puzzle.subtitle}</p></a
					>
				{/each}
			</div>
		</div>
		<!-- <div class="flex justify-between">
			{#if prevSlug}
				<a
					class="rounded-2xl border bg-secondary-100-900 p-1 px-3 text-surface-950-50"
					href={prevSlug}
					onclick={() => {
						resetToStart(cmdLog);
					}}>Previous puzzle</a
				>
			{/if}
			{#if nextSlug}
				<a
					class="rounded-2xl border bg-secondary-100-900 p-1 px-3 text-surface-950-50"
					href={nextSlug}
					onclick={() => {
						resetToStart(cmdLog);
					}}>Next puzzle</a
				>
			{/if}
		</div> -->
	</div>

	<!-- Puzzles -->
	{@render children()}
</div>
