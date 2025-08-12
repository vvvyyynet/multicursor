<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	let { valueSolution = 'no solution provided', classes = '' } = $props();
</script>

<div class={[classes, 'editor-solution pointer-events-none relative select-none']}>
	<CodeMirror value={valueSolution} lang={javascript()} extensions={[]} />
</div>

<style>
	.editor-solution :global(.cm-activeLine) {
		background-color: rgba(255, 255, 255, 0); /* Change this to your desired color */
	}
</style>
