<script lang="ts">
	import { EditorView, showTooltip, keymap } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import CodeMirror from 'svelte-codemirror-editor';
	import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
	import { Prec } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript';
	import { createCustomKeymap, logKeyboardChanges } from '$lib/functions/customFunctions.svelte';
	import SettingsDrawer from './SettingsDrawer.svelte';
	import { createEditorExtensions } from '$lib/functions/editorExtensions.svelte';
	import { onMount, untrack } from 'svelte';
	import type { TcmdLog } from '$lib/functions/historyFunctions.svelte';
	import { Confetti } from 'svelte-confetti';

	const cmdLogEmpty: TcmdLog = {
		list: [
			{
				id: 0,
				state: undefined,
				type: '',
				ntimes: 0,
				cmd: 'initial',
				combo: '',
				description: { combo: '', short: '', long: '' },
				doc: undefined,
				sel: undefined
			}
		],
		length: 0,
		currentIndex: 0
	};

	let {
		editorSettings,
		editorView = $bindable(),
		value = $bindable(),
		valueStart = '',
		valueSolution = '',
		CmdCmbChips,
		cmdLog = $bindable(cmdLogEmpty),
		classes = '',
		isSolved = false,
		resetToStart = () => {}
	} = $props();
	let isCaseSensitive = $state(false);
	let isWholeWord = $state(false);

	// Called when CodeMirror updates
	let customKeymap = $derived(createCustomKeymap(editorView, cmdLog));

	// const greenBackgroundTheme = EditorView.theme({
	// 	'&': {
	// 		backgroundColor: 'var(--color-yey)'
	// 	}
	// });

	// Reset default keybindings (i.e. overwrite with empty functions)
	// -- This guarantees, that default keybindings (like Mod-d) won't work alongside with custom keybindings for the same action.
	const combinationsToReset = ['Mod-d', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Mod-z'];
	const resetKeymap = combinationsToReset.map((combo) => {
		return {
			key: combo,
			run: () => {
				return true;
			},
			preventDefault: true
		};
	});

	// Initialize or refresh the editor
	const updateEditor = (valueStart: string) => {
		if (editorView) {
			editorView.dispatch({
				changes: { from: 0, to: editorView.state.doc.length, insert: valueStart }
			});
			resetToStart(cmdLog);
		}
	};

	// Update editor when valueStart (i.e. puzzle) changes
	$effect(() => {
		valueStart;
		untrack(() => {
			updateEditor(valueStart);
		});
	});
</script>

<div class="relative flex flex-col">
	<!-- Editor -->
	<div class={['relative', isSolved && 'border-green-300 bg-green-300', classes]}>
		<div class="absolute top-2 right-2 z-50 flex gap-2">
			<button
				onclick={() => {
					isCaseSensitive = !isCaseSensitive;
				}}
				class={[
					'h-6 w-6 rounded-md border bg-surface-50 text-xs',
					isCaseSensitive && '!bg-blue-200'
				]}>aA</button
			>
			<button
				onclick={() => {
					isWholeWord = !isWholeWord;
				}}
				class={['h-6 w-6 rounded-md border bg-surface-50 text-xs', isWholeWord && '!bg-blue-200']}
				>[...]</button
			>
		</div>
		<CodeMirror
			bind:value
			on:ready={(e) => {
				editorView = e.detail;
			}}
			on:change={(e) => {
				// console.log('ON CHANGE: editorView = ', e);
			}}
			lang={javascript()}
			extensions={[
				EditorState.tabSize.of(16),
				EditorState.readOnly.of(true), // Make the editor non-editable
				showTooltip.of(null), // Disable tooltips by setting to null
				// autocompletion({
				// 	// Disable autocomplete suggestions
				// 	override: [() => []] // Return an empty array to suppress suggestions
				// }),
				closeBrackets(), // maybe not needed (it's to ensure that it's not disabled alongside autocompletion)
				logKeyboardChanges(cmdLog),
				...createEditorExtensions(editorView, cmdLog),
				// keymap.of([...defaultKeymap, ...historyKeymap]),
				Prec.high(keymap.of(resetKeymap)),
				Prec.highest(keymap.of(customKeymap)),
				EditorView.lineWrapping
				// ...(isSolved ? [greenBackgroundTheme] : [])
			]}
		/>
	</div>

	{#if isSolved}
		<div class="ml-[50vw]">
			<Confetti size="12" x={[-6, 6]} y={[-6, 6]} amount="150" fallDistance="100px" />
		</div>
	{/if}
	<!-- Settings -->
	<SettingsDrawer {CmdCmbChips} />
</div>
