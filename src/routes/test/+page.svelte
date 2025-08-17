<script lang="ts">
	import Puzzle from '$lib/components/Puzzle.svelte';
	import IconArrowLeft from '@lucide/svelte/icons/arrow-left';
	import IconArrowRight from '@lucide/svelte/icons/arrow-right';
	import { fade, fly, slide } from 'svelte/transition';
	import { CmdCmbChipsOptions } from '$lib/constants';

	let CmdCmbChips: string = $state(CmdCmbChipsOptions[0][1]);

	const setSolved = (isSolved: boolean) => {
		solved[data.slugOfSeries][idxPuzzle] = isSolved;
	};

	let puzzle = {
		type: '404',
		slug: '404',
		title: '404',
		subtitle: 'This puzzle does not exist',
		explanation: '',
		valueStart: '',
		valueSolution: '',
		todoList: []
	};

	// Source Data
	const steps = [
		{ label: 'Step 1', description: 'The description of step 1.' },
		{ label: 'Step 2', description: 'The description of step 2.' },
		{ label: 'Step 3', description: 'The description of step 3.' },
		{ label: 'Step 4', description: 'The description of step 4.' },
		{ label: 'Step 5', description: 'The description of step 5.' }
	];

	// Reactive
	let currentStep = $state(0);
	let previousStep = $state(0);
	$inspect(currentStep, previousStep);
	const isFirstStep = $derived(currentStep === 0);
	const isLastStep = $derived(currentStep === steps.length - 1);

	let direction = $state(1);

	/** Determine if on the current step. */
	function isCurrentStep(index: number) {
		return currentStep === index;
	}
	function isCloseToCurrentStep(index: number) {
		return Math.abs(currentStep - index) <= 1;
	}

	/** Jump to a particular step. */
	function setStep(index: number) {
		currentStep = index;
		direction = currentStep > previousStep ? 1 : -1;
		previousStep = currentStep;
	}

	/** Progress to the previous step. */
	function prevStep() {
		direction = -1;
		previousStep = currentStep;
		currentStep--;
	}

	/** Progress to the next step. */
	function nextStep() {
		direction = 1;
		previousStep = currentStep;
		currentStep++;
	}
</script>

<div class="w-full">
	<!-- Stepper -->
	<div class="space-y-8">
		<!-- Timeline -->
		<div class="relative mx-auto">
			<!-- Numerals -->
			<div class="relative flex flex-row gap-2">
				{#each steps as step, i}
					<!-- Numeral Button -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<button
						class="btn-icon btn-icon-sm rounded-full {isCurrentStep(i)
							? 'preset-filled-primary-500'
							: 'preset-filled-surface-200-800'}"
						onclick={() => setStep(i)}
						title="Go to {step.label}"
						aria-label="Go to {step.label}"
					>
						<span class="font-bold">{i + 1}</span>
					</button>
				{/each}
			</div>
			<!-- Line -->
			<hr class="absolute top-[50%] right-0 left-0 z-[-1] hr !border-surface-200-800" />
		</div>
		<!-- Loop all steps -->
		{#each steps as step, i (step)}
			<!-- Filter to current step only -->
			{#if isCurrentStep(i)}
				<!-- Individual steps -->
				<div
					class="absolute top-80 space-y-2 card border-2 bg-surface-100-900 p-10 text-center"
					in:fly={{ y: 500 * direction, duration: 300 }}
					out:fly={{ y: -400 * direction, duration: 300 }}
				>
					<h2 class="h3">{step.label}</h2>
					<p>{step.description}</p>
					<p>{direction}</p>
					<!-- Puzzle -->
					<Puzzle
						classes="bg-red-200"
						puzzleType={puzzle.type}
						title={puzzle.title}
						subtitle={puzzle.subtitle}
						explanation={puzzle.explanation}
						valueStart={puzzle.valueStart}
						valueSolution={puzzle.valueSolution}
						todoList={puzzle.todoList}
						{CmdCmbChips}
						{setSolved}
						{direction}
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>

<!-- Navigation -->
<nav class="absolute bottom-20 flex items-center justify-between gap-4">
	<!-- Back Button -->
	<button
		type="button"
		class="btn preset-tonal hover:preset-filled"
		onclick={prevStep}
		disabled={isFirstStep}
	>
		<IconArrowLeft size={18} />
		<span>Previous</span>
	</button>
	<!-- Next Button -->
	<button
		type="button"
		class="btn preset-tonal hover:preset-filled"
		onclick={nextStep}
		disabled={isLastStep}
	>
		<span>Next</span>
		<IconArrowRight size={18} />
	</button>
</nav>
