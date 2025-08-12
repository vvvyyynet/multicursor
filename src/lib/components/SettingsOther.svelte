<script>
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { Settings } from '@lucide/svelte';
	import { CmdCmbChipsOptions } from '$lib/constants';

	let { CmdCmbChips = $bindable() } = $props();

	let valueAccordion = $state();
	let radioGroupCmdCmbChips = $state(0);

	$effect(() => {
		CmdCmbChips = CmdCmbChipsOptions[radioGroupCmdCmbChips][1];
	});
</script>

<Accordion value={valueAccordion} onValueChange={(e) => (valueAccordion = e.value)} collapsible>
	<Accordion.Item value="settings">
		{#snippet lead()}<Settings />{/snippet}
		{#snippet control()}Other Settings{/snippet}
		{#snippet panel()}
			<div>
				<form>
					{#each CmdCmbChipsOptions as option, idx}
						<label class="flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								bind:group={radioGroupCmdCmbChips}
								name="radio_display_cmd_combo"
								value={idx}
							/>
							<p>{option[0]}</p>
						</label>
					{/each}
				</form>
			</div>
		{/snippet}
	</Accordion.Item>
</Accordion>
