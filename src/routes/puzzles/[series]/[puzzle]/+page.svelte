<script lang="ts">
	import type { PageProps } from './$types';
	import { CmdCmbChipsOptions } from '$lib/constants';
	import Puzzle from '$lib/components/Puzzle.svelte';
	import { solved } from '$lib/stores/stores.svelte';
	import { fade, fly } from 'svelte/transition';
	import { untrack } from 'svelte';
	let { data }: PageProps = $props();

	let CmdCmbChips: string = $state(CmdCmbChipsOptions[0][1]);

	let descOfSeries = $derived(data.sets?.[data.slugOfSeries].desc);
	let puzzlesOfSeries = $derived(data.sets?.[data.slugOfSeries].puzzles);
	let allSlugs = $derived(puzzlesOfSeries.map((puzzle) => puzzle.slug));
	let idxPuzzle = $derived(allSlugs.findIndex((slug) => slug === data.slugOfPuzzle));

	// temp
	let isSolved = $derived(solved[data.slugOfSeries][data.slugOfPuzzle]);

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
			valueSolution: '',
			todoList: []
		}
	);
</script>

<div class="mt-5 w-full p-2">
	<!-- Puzzle -->
	<Puzzle
		puzzleType={puzzle.type}
		title={puzzle.title}
		subtitle={puzzle.subtitle}
		explanation={puzzle.explanation}
		valueStart={puzzle.valueStart}
		valueSolution={puzzle.valueSolution}
		todoList={puzzle.todoList}
		{CmdCmbChips}
		{setSolved}
	/>
</div>

<!-- {#if isSolved}
		<a
			class="rounded-2xl border bg-secondary-100-900 p-1 px-3 text-surface-950-50"
			href={nextSlug}
			onclick={() => {
				resetToStart(cmdLog);
			}}>Next puzzle</a
		>
	{/if} -->
