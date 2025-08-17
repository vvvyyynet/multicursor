<script>
	import { restoreHistory } from '$lib/functions/historyFunctions.svelte';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { History } from '@lucide/svelte';

	let { cmdLog, editorView = $bindable() } = $props();

	let historyChipsMode = $state('combo');
	let visibleAccordion = $state(['main']);
</script>

<Accordion
	value={visibleAccordion}
	onValueChange={(e) => (visibleAccordion = e.value)}
	collapsible
	classes="mt-20"
>
	<!-- History -->
	<Accordion.Item value="main">
		{#snippet lead()}<History />{/snippet}
		{#snippet control()}Show/Hide History{/snippet}
		{#snippet panel()}
			<form class="relative w-full space-y-2 pt-5">
				<fieldset class="absolute top-0 right-0 flex flex-row gap-5">
					<label class="flex items-center space-x-2">
						<input
							class="hidden"
							type="radio"
							id="combo"
							name="descriptionFlavour"
							value="combo"
							bind:group={historyChipsMode}
						/>
						<p class={historyChipsMode === 'combo' ? 'font-bold' : ''}>Keystrokes</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="hidden"
							type="radio"
							id="short"
							name="descriptionFlavour"
							value="short"
							bind:group={historyChipsMode}
						/>
						<p class={historyChipsMode === 'short' ? 'font-bold' : ''}>Short</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="hidden"
							type="radio"
							id="long"
							name="descriptionFlavour"
							value="long"
							bind:group={historyChipsMode}
						/>
						<p class={historyChipsMode === 'long' ? 'font-bold' : ''}>Long</p>
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
									: 'bg-primary-50-950 text-surface-900-100',
								step.type === 'init' && ' !bg-white !px-2'
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
