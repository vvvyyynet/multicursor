<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import EditorSolution from '$lib/components/EditorSolution.svelte';
	import { EditorView } from '@codemirror/view';
	import { type TcmdLog, restoreHistory } from '$lib/functions/historyFunctions.svelte';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { History, Timer } from '@lucide/svelte';
	import { editorSettings } from '$lib/stores/stores.svelte';

	let {
		title = '',
		subtitle = '',
		explanation = '',
		valueStart = '',
		valueSolution = '_',
		CmdCmbChips = '',
		set_solved = () => {},
		prevSlug = '',
		nextSlug = '',
		nSolved = 0
	} = $props();

	let historyChipsMode = $state('combo');
	// Reset
	function resetToStart(cmdLog: TcmdLog) {
		// Reset editor
		value = valueStart;
		editorView.focus();

		// Reset log cmdLog
		while (cmdLog.list.length > 1) {
			cmdLog.list.pop();
		}

		// Reset counters
		time = 0;
		cmdCount = 0;
		cmdCountAll = 0;
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
	let time = $state(0); // units: 1/10 sec
	let timer;
	function startTimer() {
		editorView.focus();
		timer = setInterval(() => {
			time++;
		}, 100);
	}
	function endTimer() {
		if (timer) {
			clearInterval(timer);
		}
	}

	// Extend valueSolution and valueStart
	let valStart = $derived(valueStart + '\n\n\n\n');
	let valSolution = $derived(valueSolution + '\n\n\n\n');

	$inspect(valueStart);

	let value = $state(''); //! IMPORTANT: This will be set to valueStart ONLY INSIDE the Editor component (needed for onMount-hack)
	let editorView: EditorView = $state();

	let is_solved = false;
	$effect(() => {
		is_solved = value == valSolution;
		set_solved(is_solved);
	});
	$effect(() => {
		if (is_solved) {
			endTimer();
		}
	});

	// Accordions
	let visibleHistory = $state(['history']);
	let visibleTimer = $state([]);
</script>

<!-- Navigation -->
<div class="mx-auto mb-5 flex w-1/2 flex-col gap-5">
	<p class="m-1 text-center text-xl">
		<strong>Number of puzzles solved:</strong><br />
		{nSolved}
	</p>
	<div class="flex justify-between">
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
	</div>
</div>
<!-- Puzzle -->
<h1 class="h2">{title}: <span class="h4">{subtitle}</span></h1>
<p class="">{explanation}</p>

<div class="mt-10">
	<p class="">Target:</p>
	<EditorSolution
		valueSolution={valSolution}
		classes="bg-surface-950-50 opacity-75 text-surface-50-950 my-2"
	/>
</div>

<div class="mt-10">
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
	/>
</div>

<!-- Display value with all whitespaces and \n -->
<!-- <div class="mt-2 text-xs">
	<p class="font-bold">Input as a string:</p>
	<pre class="">{@html JSON.stringify(value).slice(1, -1)}</pre>
</div> -->

<Accordion
	value={visibleHistory}
	onValueChange={(e) => (visibleHistory = e.value)}
	collapsible
	classes="mt-20"
>
	<!-- History -->
	<Accordion.Item value="history">
		{#snippet lead()}<History />{/snippet}
		{#snippet control()}Show History{/snippet}
		{#snippet panel()}
			<form class="space-y-2">
				<fieldset class="flex flex-row gap-5">
					<legend>Display mode:</legend>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							id="combo"
							name="descriptionFlavour"
							value="combo"
							bind:group={historyChipsMode}
						/>
						<p>Keystrokes</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							id="short"
							name="descriptionFlavour"
							value="short"
							bind:group={historyChipsMode}
						/>
						<p>Short</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							id="long"
							name="descriptionFlavour"
							value="long"
							bind:group={historyChipsMode}
						/>
						<p>Long</p>
					</label>
				</fieldset>
			</form>

			<div class="mt-4 flex flex-wrap gap-2">
				{#each cmdLog.list as step, i}
					<div class="relative mt-2 px-1">
						<button
							class={[
								'mr-2 flex cursor-pointer justify-center rounded-full border px-6 py-1 text-center transition',
								i <= cmdLog.currentIndex
									? 'bg-primary-100-900 text-surface-950-50'
									: 'bg-primary-300-700 text-surface-900-100',
								step.type === 'init' && ' !bg-green-600 !px-2'
							]}
							onclick={(ev) => {
								restoreHistory(editorView, cmdLog, i);
								editorView.focus();
								ev.preventDefault();
							}}
							title={step.type}
						>
							<p class="w-full text-center">
								{@html historyChipsMode === 'combo'
									? step.description.combo
									: historyChipsMode === 'long'
										? step.description.long
										: step.description.short}
							</p>
						</button>
						{#if step.ntimes > 1}
							<div
								class="absolute top-0 right-0 flex h-6 w-6 -translate-x-0 -translate-y-2 items-center justify-center rounded-full bg-warning-500 font-bold text-surface-900"
							>
								<p>{step.ntimes}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/snippet}
	</Accordion.Item>
</Accordion>

<Accordion
	value={visibleTimer}
	onValueChange={(e) => (visibleTimer = e.value)}
	collapsible
	classes="mt-5"
>
	<!-- Timer and Stats-->
	<Accordion.Item value="history">
		{#snippet lead()}<Timer />{/snippet}
		{#snippet control()}Show Timer and Stats{/snippet}
		{#snippet panel()}
			<div class="m-5 flex gap-2">
				<button
					class="btn rounded-lg bg-green-200 btn-sm px-2 text-black"
					onclick={() => {
						startTimer();
					}}
					>Start
				</button>
				<button
					class="btn rounded-lg bg-red-200 btn-sm px-2 text-black"
					onclick={() => {
						endTimer();
					}}
					>Stop
				</button>
				<button
					class="btn rounded-lg bg-amber-200 btn-sm px-2 text-black"
					onclick={() => {
						resetToStart(cmdLog);
					}}>Reset</button
				>
			</div>

			<!-- Timer -->
			<div class="mt-2 text-xs">
				<p><strong>Time:</strong> {time}</p>
				<!-- <p><strong>Number of Commands:</strong> {cmdCount}</p> -->
				<p><strong>Number of Key-Combos:</strong> {cmdCountAll} (without repetitions)</p>
			</div>
		{/snippet}
	</Accordion.Item>
</Accordion>
