<script>
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { Timer } from '@lucide/svelte';
	let {
		cmdLog,
		editorView = $bindable(),
		isSolved,
		cmdCountAll,
		cmdCount,
		resetToStart,
		time = $bindable()
	} = $props();

	let visibleAccordion = $state(['main']);

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

	// Start timer on first interaction with editor
	$effect(() => {
		if (cmdLog.list.length > 1 && !timer) {
			startTimer();
		}
	});

	// Stop timer when solved
	$effect(() => {
		if (isSolved) {
			endTimer();
		}
	});
</script>

<Accordion
	value={visibleAccordion}
	onValueChange={(e) => (visibleAccordion = e.value)}
	collapsible
	classes="mt-5"
>
	<!-- Timer and Stats-->
	<Accordion.Item value="main">
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
