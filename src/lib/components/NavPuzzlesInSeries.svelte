<script>
	import { solved } from '$lib/stores/stores.svelte';
	let {
		slugOfSeries,
		puzzlesOfSeries,
		gotoPuzzle,
		slugOfPuzzle,
		idxOfPuzzle,
		classes = '',
		isMinified
	} = $props();
</script>

<div
	class={[
		'',
		isMinified
			? 'inline-flex flex-row justify-center gap-5 transition-all duration-300 group-hover/top:hidden'
			: 'flex flex-col items-start justify-start gap-2 transition-all duration-300',
		classes
	]}
>
	{#each puzzlesOfSeries as puzzle, idx}
		<button
			class={[
				'flex w-full text-center text-sm',
				!isMinified && 'flex-row items-start justify-start gap-1'
			]}
			onclick={() => {
				gotoPuzzle(puzzle.slug);
			}}
		>
			<div
				class={[
					'h-3 w-3 rounded-full border-2 border-black',
					puzzle.slug === slugOfPuzzle
						? 'bg-amber-200'
						: solved[slugOfSeries][idxOfPuzzle]
							? 'bg-green-500'
							: 'bg-white'
				]}
			></div>
			<p class={[isMinified ? 'hidden' : 'hidden text-center text-xs group-hover/top:block']}>
				{puzzle.titleBreadcrumb}
			</p>
		</button>
	{/each}
</div>
