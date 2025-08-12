<script lang="ts">
	import { myBindings } from '$lib/settings/keymaps.svelte';
	import { customCommands } from '$lib/constants';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { Settings } from '@lucide/svelte';
	import { keymapChoice } from '$lib/settings/keymaps.svelte';

	let valueAccordion = $state([]);
	let valueAccordion2 = $state([]);

	let radioGroups = $state(Object.fromEntries(customCommands.map((cmd) => [cmd, 0])));

	// let keymapChoice = $derived(
	// 	Object.fromEntries(
	// 		customCommands.map((cmd) => [cmd, myBindings[cmd].keymapChoices[radioGroups[cmd]]])
	// 	)
	// );
	$effect(() => {
		customCommands.forEach((cmd) => {
			keymapChoice[cmd] = myBindings[cmd].keymapChoices[radioGroups[cmd]];
		});
	});
</script>

<Accordion value={valueAccordion} onValueChange={(e) => (valueAccordion = e.value)} collapsible>
	<Accordion.Item value="settings">
		{#snippet lead()}<Settings />{/snippet}
		{#snippet control()}Choose keymap{/snippet}
		{#snippet panel()}
			<Accordion
				value={valueAccordion2}
				onValueChange={(e) => (valueAccordion2 = e.value)}
				collapsible
			>
				{#each customCommands as cmd}
					<Accordion.Item value={cmd}>
						{#snippet lead()}{/snippet}
						{#snippet control()}{cmd}{/snippet}
						{#snippet panel()}
							<form class="space-y-2">
								{#each myBindings[cmd].keymapChoices as choice, idx}
									<label class="flex items-center space-x-2">
										<input
											class="radio"
											type="radio"
											bind:group={radioGroups[cmd]}
											name="radio_{cmd}"
											value={idx}
										/>
										<p>{choice.desc_combo}</p>
									</label>
								{/each}
							</form>
						{/snippet}
					</Accordion.Item>
				{/each}
			</Accordion>
		{/snippet}
	</Accordion.Item>
</Accordion>
