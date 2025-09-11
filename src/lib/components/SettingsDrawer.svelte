<script>
	import SettingsKeymap from '$lib/components/SettingsKeymap.svelte';
	import SettingsOther from '$lib/components/SettingsOther.svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import { Settings, X } from '@lucide/svelte';

	let { CmdCmbChips } = $props();

	// Drawer with Settings
	let drawerState = $state(false);

	function drawerClose() {
		drawerState = false;
	}
</script>

<Modal
	open={drawerState}
	onOpenChange={(e) => (drawerState = e.open)}
	triggerBase="btn bg-secondary-100-900 p-1 px-3 m-2 mr-0 absolute right-0"
	contentBase="bg-surface-300-700 p-4 space-y-4 shadow-xl w-[480px] h-screen overflow-y-auto"
	positionerJustify="justify-start"
	positionerAlign=""
	positionerPadding=""
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
	{#snippet trigger()}<Settings /><span>Settings</span>{/snippet}
	{#snippet content()}
		<header class="flex justify-between">
			<h2 class="h2">Settings</h2>
			<button type="button" class="btn" onclick={drawerClose}><X /></button>
		</header>
		<article>
			<p>
				<strong>Wichtig:</strong> Dies ist bloss ein Mock-up. Die definitiven Settings werden übersichtlicher
				gestaltet und enthalten Presets für verschiedene Tastaturlayouts und Betriebssysteme.
			</p>
			<SettingsKeymap />
			<!-- <SettingsOther bind:CmdCmbChips /> -->
		</article>
	{/snippet}
</Modal>
