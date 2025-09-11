<script lang="ts">
	import { onMount } from 'svelte';
	import IconArrowLeft from '@lucide/svelte/icons/arrow-left';
	import IconArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { PageProps } from './$types';
	import { CmdCmbChipsOptions } from '$lib/constants';
	import Puzzle from '$lib/components/Puzzle.svelte';
	import NavPuzzlesInSeries from '$lib/components/NavPuzzlesInSeries.svelte';
	import { solved } from '$lib/stores/stores.svelte';
	import { goto } from '$app/navigation';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	let { data }: PageProps = $props();

	let descOfSeries = $derived(data.sets?.[data.slugOfSeries].desc);
	let puzzlesOfSeries = $derived(data.sets?.[data.slugOfSeries].puzzles);
	let allSlugs = $derived(puzzlesOfSeries.map((puzzle) => puzzle.slug));

	let slugOfPuzzle = $derived(data.slugOfPuzzle ? data.slugOfPuzzle : '1');
	let slugOfPrev = $state('');
	let idxOfPuzzle = $derived(allSlugs.findIndex((slug) => slug === slugOfPuzzle));
	let idxOfPrev = $derived(allSlugs.findIndex((slug) => slug === slugOfPrev));
	let CmdCmbChips: string = $state(CmdCmbChipsOptions[0][1]);

	// Solved Stats
	let isSolvedCurrent = $derived(solved[data.slugOfSeries][slugOfPuzzle]);
	const setSolved = (isSolved: boolean) => {
		console.log('SETTING SOLVED', isSolved);
		solved[data.slugOfSeries][idxOfPuzzle] = isSolved;
	};

	// Navigation
	let direction = $state(1);
	const isFirstPuzzle = $derived(slugOfPuzzle === puzzlesOfSeries[0]);
	const isLastPuzzle = $derived(slugOfPuzzle === puzzlesOfSeries[puzzlesOfSeries.length - 1]);
	$inspect(slugOfPuzzle, idxOfPuzzle, slugOfPrev, idxOfPrev, direction);

	/** Determine if on the current step. */
	function isslugOfPuzzle(slug: string) {
		return slug === slugOfPuzzle;
	}

	/** Jump to a particular step. */
	function gotoPuzzle(slug: number) {
		goto(`?puzzle=${slug}`);
		direction = idxOfPuzzle > idxOfPrev ? 1 : -1;
		slugOfPrev = slugOfPuzzle;
	}

	/** Progress to the previous step. */
	function navigateBackward() {
		goto(`?puzzle=${allSlugs[idxOfPuzzle - 1]}`);
		direction = -1;
	}

	/** Progress to the next step. */
	function navigateForward() {
		goto(`?puzzle=${allSlugs[idxOfPuzzle + 1]}`);
		direction = 1;
	}

	onMount(() => {
		console.log('XXX:', page.url.searchParams.has('puzzle'));
		if (!page.url.searchParams.has('puzzle')) {
			console.log('help');
			goto(`?puzzle=${puzzlesOfSeries[0].slug}`);
		}
		console.log(page.url.searchParams.has('puzzle'));
	});
	const classes_animation = 'opacity-0 transition-all duration-400 group-hover/top:opacity-100';
	let isTopHovered = $state(false);
</script>

<div class={['mx-auto max-w-300 p-5 pt-0', isSolvedCurrent ? 'bg-green-200' : 'bg-surface-50/80']}>
	<!-- Series -->
	<!-- svelte-ignore a11y_mouse_events_have_key_events -->
	<div
		role="button"
		tabindex="-1"
		onmouseover={() => {
			isTopHovered = true;
		}}
		onmouseleave={() => {
			isTopHovered = false;
		}}
		class="group/top relative z-90 h-[10vh] w-full bg-transparent pt-5 transition-all duration-500 hover:h-120 hover:pb-110"
	>
		{#if isTopHovered}
			<a
				class={[
					classes_animation,
					'btn rounded-2xl border bg-secondary-100-900 p-1 px-3 text-surface-950-50 delay-300 duration-900'
				]}
				href={`${base}/puzzles`}><ArrowLeft />Puzzle-Sets</a
			>
		{/if}
		<h1 class="mb-2 h6 transition-all group-hover/top:h4">
			{descOfSeries.title1}
			<span class="mx-2">{'>'}</span>
			<span class="text-gray-500">
				{puzzlesOfSeries?.[idxOfPuzzle]?.titleBreadcrumb || ''}
			</span>
		</h1>
		<NavPuzzlesInSeries
			isMinified={true}
			slugOfSeries={data.slugOfSeries}
			{puzzlesOfSeries}
			{slugOfPuzzle}
			{idxOfPuzzle}
			{gotoPuzzle}
			classes="mb-4"
		/>
		{#if isTopHovered}
			<div class="group-hover/top:block">
				<p class={['mb-5 delay-100', classes_animation]}>
					{descOfSeries.text_inside}
				</p>
			</div>
			<!-- Navigation -->
			<nav class="group/nav bottom-0 my-10 min-h-40 w-full overflow-y-auto">
				<NavPuzzlesInSeries
					isMinified={false}
					slugOfSeries={data.slugOfSeries}
					{puzzlesOfSeries}
					{slugOfPuzzle}
					{idxOfPuzzle}
					{gotoPuzzle}
				/>
				<!-- <hr class="absolute top-[50%] z-[-1] hr !border-red-800" /> -->
			</nav>

			<div class="flex gap-2">
				<!-- Back Button -->
				<button
					type="button"
					class="btn rounded-full preset-tonal hover:preset-filled"
					onclick={navigateBackward}
					disabled={isFirstPuzzle}
				>
					<IconArrowLeft size={20} /> Previous Puzzle
				</button>
				<!-- Next Button -->
				<button
					type="button"
					class="btn rounded-full preset-tonal hover:preset-filled"
					onclick={navigateForward}
					disabled={isLastPuzzle}
				>
					<IconArrowRight size={20} /> Next Puzzle
				</button>
			</div>
		{/if}
	</div>
	<!-- Puzzle -->
	<div class="z-10 mt-15 w-full p-2">
		{#each puzzlesOfSeries as puzzle (puzzle)}
			<!-- Filter to current step only -->
			{#if isslugOfPuzzle(puzzle.slug)}
				<Puzzle
					puzzleType={puzzle.type}
					part={puzzle.part}
					title={puzzle.title}
					explanation={puzzle.explanation}
					protipp={puzzle.protipp}
					valueStart={puzzle.valueStart}
					valueSolution={puzzle.valueSolution}
					todoList={puzzle.todoList}
					{CmdCmbChips}
					{setSolved}
					{direction}
					{navigateForward}
				/>
			{/if}
		{/each}
	</div>
</div>
