<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { data } = $props();

	let descOfSeries = $derived(data.puzzles?.[data.slugOfSeries].desc);
	let puzzlesOfSeries = $derived(data.puzzles?.[data.slugOfSeries].puzzles);
	let allSlugs = $derived(puzzlesOfSeries.map((puzzle) => puzzle.slug));

	onMount(() => {
		goto(`${base}${page.url.pathname}/1`, { replaceState: true });
	});
</script>
