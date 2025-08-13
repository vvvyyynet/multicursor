<script lang="ts">
	import type { PageProps } from './$types';
	import { CmdCmbChipsOptions } from '$lib/constants';
	import Puzzle from '$lib/components/Puzzle.svelte';
	import { solved } from '$lib/stores/stores.svelte';
	let { data }: PageProps = $props();

	let CmdCmbChips: string = $state(CmdCmbChipsOptions[0][1]);

	let descOfSeries = $derived(data.puzzles?.[data.slugOfSeries].desc);
	let puzzlesOfSeries = $derived(data.puzzles?.[data.slugOfSeries].puzzles);
	let allSlugs = $derived(puzzlesOfSeries.map((puzzle) => puzzle.slug));
	let idxPuzzle = $derived(allSlugs.findIndex((slug) => slug === data.slugOfPuzzle));

	const setSolved = (isSolved: boolean) => {
		solved[data.slugOfSeries][idxPuzzle] = isSolved;
	};

	let puzzle = $derived(
		puzzlesOfSeries[idxPuzzle] || {
			type: '404',
			slug: '404',
			title: '404',
			subtitle: 'This puzzle does not exist',
			explanation: '',
			valueStart: '',
			valueSolution: ''
		}
	);
</script>

<div class="mt-5 w-[90vw] border-3 border-black p-5">
	<!-- Puzzle -->
	<Puzzle
		puzzleType={puzzle.type}
		title={puzzle.title}
		subtitle={puzzle.subtitle}
		explanation={puzzle.explanation}
		valueStart={puzzle.valueStart}
		valueSolution={puzzle.valueSolution}
		{CmdCmbChips}
		{setSolved}
	/>
</div>
