<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import EditorSolution from '$lib/components/EditorSolution.svelte';
	import { EditorView } from '@codemirror/view';
	import { type TcmdLog } from '$lib/functions/historyFunctions.svelte';
	import { editorSettings } from '$lib/stores/stores.svelte';
	import PuzzleHistory from './PuzzleHistory.svelte';
	import PuzzleTimer from './PuzzleTimer.svelte';
	import { logToHistory } from '$lib/functions/customFunctions.svelte';

	let {
		puzzleType = undefined,
		title = '',
		subtitle = '',
		explanation = '',
		valueStart = '',
		valueSolution = '_',
		CmdCmbChips = '',
		setSolved = () => {}
	} = $props();

	let time = $state({ val: 0 }); // units: 1/10 sec

	// Reset
	function resetToStart(cmdLog: TcmdLog) {
		// Reset editor
		value = valueStart;
		editorView.focus();

		// Reset log cmdLog
		while (cmdLog.list.length > 0) {
			cmdLog.list.pop();
		}

		// Reset counters
		time.val = 0;
		cmdCount = 0;
		cmdCountAll = 0;

		// Reset history
		logToHistory('init', editorView.state, cmdLog, 'init');
	}

	let cmdLog: TcmdLog = $state({ list: [], length: 0, currentIndex: 0 });

	let cmdCountAll = $derived.by(() => {
		return cmdLog.list.length - 1 || 0; // substract "init"
	});
	let cmdCount = $derived.by(() => {
		if (cmdLog) {
			return (
				cmdCountAll -
				2 * cmdLog.list.filter((log) => log.cmd === 'histBack' || log.cmd === 'histForward').length
			);
		} else {
			return 0;
		}
	});

	// Extend valueSolution and valueStart
	let valStart = $derived(valueStart + '\n\n\n\n');
	let valSolution = $derived(valueSolution + '\n\n\n\n');

	let value = $state(''); //! IMPORTANT: This will be set to valueStart ONLY INSIDE the Editor component (needed for onMount-hack)
	let editorView: EditorView = $state();

	let isSolved = $derived(value === valSolution);
	$effect(() => {
		setSolved(isSolved);
	});
</script>

<!-- Puzzle -->
<h2 class="h4">{title}</h2>
<h1 class="h1">{subtitle}</h1>
<p class="mt-4">{explanation}</p>

<div class="mt-10 flex w-full items-start justify-start gap-10">
	{#if puzzleType === 'change'}
		<div class="h-full w-full">
			<p class="">Target:</p>
			<EditorSolution
				valueSolution={valSolution}
				classes="bg-surface-950-50 opacity-75 text-surface-50-950 my-2"
			/>
		</div>
	{/if}
	<div class="h-full w-full">
		<p class="">Edit here:</p>
		<Editor
			editorSettings
			bind:editorView
			bind:value
			valueStart={valStart}
			valueSolution={valSolution}
			{CmdCmbChips}
			bind:cmdLog
			classes="bg-surface-950-50 text-surface-50-950"
			{resetToStart}
		/>
	</div>
</div>

<!-- Display value with all whitespaces and \n -->
<!-- <div class="mt-2 text-xs">
	<p class="font-bold">Input as a string:</p>
	<pre class="">{@html JSON.stringify(value).slice(1, -1)}</pre>
</div> -->

{#if puzzleType === 'change'}
	<PuzzleHistory {cmdLog} bind:editorView />
	<PuzzleTimer
		{cmdLog}
		bind:editorView
		{isSolved}
		{cmdCountAll}
		{cmdCount}
		{resetToStart}
		bind:time={time.val}
	/>
{/if}
