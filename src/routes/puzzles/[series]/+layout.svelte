<script>
	import NavPuzzlesInSeries from '$lib/components/NavPuzzlesInSeries.svelte';

	import { solved } from '$lib/stores/stores.svelte';
	import { onMount } from 'svelte';
	let { data, children } = $props();

	let descOfSeries = $derived(data.sets?.[data.slugOfSeries].desc);
	let puzzlesOfSeries = $derived(data.sets?.[data.slugOfSeries].puzzles);
	let allSlugs = $derived(puzzlesOfSeries.map((puzzle) => puzzle.slug));

	// Series Stats
	onMount(() => {
		solved[data.slugOfSeries] = Array(puzzlesOfSeries.length).fill(false);
	});
	let nSolved = $derived(solved[data.slugOfSeries].filter(Boolean).length);
</script>

<div class="">
	<h1 class="h4">{descOfSeries.title1}</h1>
	<h2 class="h6">{descOfSeries.text_inside}</h2>

	<!-- Navigation -->
	<div class="m-5 mx-auto mb-5 flex w-full flex-col gap-5">
		<NavPuzzlesInSeries {puzzlesOfSeries} classes="flex w-full justify-center gap-10" />
	</div>

	<!-- Puzzles -->
	{@render children()}
</div>
