<script lang="ts">
	import type { PageProps } from './$types';
	import { CmdCmbChipsOptions } from '$lib/constants';
	import Puzzle from '$lib/components/Puzzle.svelte';
	import { editorSettings } from '$lib/stores/stores.svelte';
	import { page } from '$app/state';
	let { data }: PageProps = $props();

	let CmdCmbChips: string = $state(CmdCmbChipsOptions[0][1]);

	// Slugs
	let nextSlug = $derived(String(Number(page.url.pathname.split('/').pop()) + 1));
	let prevSlug = $derived(String(Number(page.url.pathname.split('/').pop()) - 1));
</script>

<div class="mt-5 w-[90vw] border-3 border-black p-5">
	<Puzzle
		title={data.puzzle.title}
		subtitle={data.puzzle.subtitle}
		explanation={data.puzzle.explanation}
		valueStart={data.puzzle.valueStart}
		valueSolution={data.puzzle.valueSolution}
		{CmdCmbChips}
		set_solved={(solved: boolean) => {
			data.is_solved_array[data.puzzle.n] = solved;
		}}
		{prevSlug}
		{nextSlug}
		nSolved={data.is_solved_array.filter(Boolean).length}
	/>
</div>
