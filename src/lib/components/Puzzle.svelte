<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import EditorSolution from '$lib/components/EditorSolution.svelte';
	import { EditorView } from '@codemirror/view';
	import { type TcmdLog } from '$lib/functions/historyFunctions.svelte';
	import PuzzleHistory from './PuzzleHistory.svelte';
	import PuzzleTodolist from './PuzzleTodolist.svelte';
	import PuzzleTimerStats from './PuzzleTimerStats.svelte';
	import { logToHistory } from '$lib/functions/customFunctions.svelte';
	import { fade, fly } from 'svelte/transition';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';

	let {
		classes = '',
		puzzleType = undefined,
		part = '',
		title = '',
		explanation = '',
		protipp = '',
		valueStart = '',
		valueSolution = '_',
		todoList = [],
		CmdCmbChips = '',
		setSolved = () => {},
		direction,
		navigateForward
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
	let valStart = $derived(valueStart);
	let valSolution = $derived(valueSolution);

	let value = $state(''); //! IMPORTANT: This will be set to valueStart ONLY INSIDE the Editor component (needed for onMount-hack)
	let editorView: EditorView = $state();

	let isSolved = $state(false);

	$effect(() => {
		cmdLog;
		if (puzzleType === 'change') {
			if (value === valSolution) {
				isSolved = true;
				setSolved(isSolved);
			} else {
				isSolved = false;
			}
		} else if (puzzleType === 'todo') {
			if (
				todoList.every((todo) => {
					return cmdLog.list.some((item) => {
						return item.description.combo === todo;
					});
				})
			) {
				isSolved = true;
				setSolved(isSolved);
			} else {
				isSolved = false;
			}
		}
	});

	let hasTwoCols = $derived(puzzleType === 'change');
</script>

<div class={['relative m-0 mt-0 w-full', classes]}>
	<div class={['absolute top-0 left-0 mx-10 min-h-[50vh] w-full bg-amber-100 p-2', classes]}>
		<!-- Explantions -->
		{#if puzzleType === 'expl'}
			<div
				class={['absolute left-1/4 w-1/2 p-2']}
				in:fly|global={{ y: 300 * direction, duration: 300 }}
				out:fly|global={{ y: -300 * direction, duration: 300 }}
			>
				<div class="z-90 border-2 border-surface-950-50 bg-surface-50-950 p-2">
					<h1 class="h2">{title}</h1>
					<h2 class="h6">{part}</h2>
					<p class="prose mt-4 text-xl">{explanation}</p>
				</div>
				<!-- NextButton -->
				<button
					in:fade|global={{ duration: 300, delay: 200 }}
					out:fade|global={{ duration: 300, delay: 200 }}
					class="mt-15 rounded-2xl border bg-secondary-100-900 px-10 py-2 text-3xl text-surface-950-50"
					onclick={navigateForward}
					><ArrowRight class="mr-2 inline-block" />
					<span>Start</span></button
				>
			</div>
		{:else if puzzleType === 'todo'}
			<!--




	
		=====================
		Todo-Puzzle
		=====================
	
	
		-->
			<!-- Title -->
			<div
				class={[
					'absolute -top-5 -left-10 z-90 grid-cols-[1fr_3fr] gap-5 border-2 border-surface-950-50 bg-surface-50-950 px-10 py-4 text-lg'
				]}
				in:fly|global={{ y: 300 * direction, duration: 300, delay: 120 }}
				out:fly|global={{ y: -300 * direction, duration: 300 }}
			>
				<!-- Explanation -->
				<h1 class="h2">{title}</h1>
				<h2 class="h6">{part}</h2>
				<p class="prose mt-4">{explanation}</p>
				{#if protipp}
					<p class="prose mt-4"><span class="font-bold">Pro-Tipp:</span> {protipp}</p>
				{/if}
				<!-- Reset Button -->
				<button
					class="m-5 btn rounded-lg bg-amber-200 btn-sm px-2 text-black"
					onclick={() => {
						resetToStart(cmdLog);
					}}>Restart Puzzle</button
				>
			</div>

			<!-- Todolist -->
			<div
				class="absolute top-1/2 -left-20 z-90 border-2 border-surface-950-50 bg-surface-50-950 p-2"
				in:fly|global={{ x: -200, delay: 400, duration: 300 }}
				out:fade|global={{ delay: 0, duration: 300 }}
			>
				<p class="font-bold">Checklist:</p>
				<PuzzleTodolist {cmdLog} {todoList} bind:editorView />
			</div>

			<!-- Editor -->
			<div
				class="absolute top-40 left-60 z-90 border-2 border-surface-950-50 bg-surface-50-950 p-2"
				in:fly|global={{ y: 300 * direction, duration: 300, delay: 200 }}
				out:fly|global={{ y: -300 * direction, duration: 300, delay: 0 }}
			>
				<!-- Editor -->
				<p class="font-bold">Edit here:</p>
				<Editor
					editorSettings
					bind:editorView
					bind:value
					valueStart={valStart}
					valueSolution={valSolution}
					{CmdCmbChips}
					bind:cmdLog
					{isSolved}
					classes="bg-surface-50 text-surface-800"
					{resetToStart}
				/>
			</div>

			<!-- On Solved -->
			{#if isSolved}
				<div class="fixed bottom-10 left-0 z-90 flex w-full flex-col items-center justify-center">
					<!-- Buttons -->
					<button
						class="mt-15 rounded-2xl border bg-secondary-100-900 px-10 py-2 text-3xl text-surface-950-50"
						onclick={navigateForward}
					>
						<ArrowRight class="mr-2 inline-block" />
						<span>Next Puzzle</span></button
					>

					<button
						class="mt-4 btn rounded-lg bg-amber-200 btn-sm px-2 text-black"
						onclick={() => {
							resetToStart(cmdLog);
						}}
					>
						<span>Solve agin</span></button
					>
				</div>
			{/if}
		{:else if puzzleType === 'change'}
			<!--




	
		=====================
		Change-Puzzle
		=====================
	
	
		-->
			<div
				class={['grid grid-cols-[1fr_3fr] gap-5']}
				in:fly|global={{ y: 100 * direction, duration: 300 }}
				out:fly|global={{ y: -100 * direction, duration: 300 }}
			>
				<!-- Left Column -->
				<div>
					<!-- Explanation -->
					<div class="border-r-2 border-white p-2">
						<h1 class="h2">{title}</h1>
						<h2 class="h6">{part}</h2>
						<p class="prose mt-4 text-xl">{explanation}</p>
					</div>
					<!-- Reset Button -->
					<button
						class="m-5 btn rounded-lg bg-amber-200 btn-sm px-2 text-black"
						onclick={() => {
							resetToStart(cmdLog);
						}}>Restart Puzzle</button
					>

					<!-- Target -->
					<div class="h-full w-full">
						<p class="">Target:</p>
						<EditorSolution
							valueSolution={valSolution}
							classes="bg-surface-100 border-2 opacity-75 text-surface-800 my-2"
						/>
					</div>
				</div>

				<!-- Right Column -->
				<div
					class="p-2"
					in:fade|global={{ delay: 1700, duration: 300 }}
					out:fade|global={{ delay: 0, duration: 300 }}
				>
					<!-- Editor -->
					<p class="font-bold">Edit here:</p>
					<Editor
						editorSettings
						bind:editorView
						bind:value
						valueStart={valStart}
						valueSolution={valSolution}
						{CmdCmbChips}
						bind:cmdLog
						{isSolved}
						classes="bg-surface-100 border-2 border-black text-surface-800"
						{resetToStart}
					/>
					<!-- History -->
					<PuzzleHistory {cmdLog} bind:editorView />
				</div>

				<!-- On Solved -->
				{#if isSolved}
					<div class="col-span-2 flex w-full flex-col items-center justify-center">
						<!-- Stats and Timer -->
						<PuzzleTimerStats
							{cmdLog}
							bind:editorView
							{isSolved}
							{cmdCountAll}
							bind:time={time.val}
							classes="my-5 mt-20 flex flex-col items-center justify-center gap-3"
						/>

						<!-- Buttons -->
						<button
							class="mt-15 rounded-2xl border bg-secondary-100-900 px-10 py-2 text-3xl text-surface-950-50"
							onclick={navigateForward}
						>
							<ArrowRight class="mr-2 inline-block" />
							<span>Next Puzzle</span></button
						>

						<button
							class="mt-4 btn rounded-lg bg-amber-200 btn-sm px-2 text-black"
							onclick={() => {
								resetToStart(cmdLog);
							}}
						>
							<span>Solve agin</span></button
						>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
