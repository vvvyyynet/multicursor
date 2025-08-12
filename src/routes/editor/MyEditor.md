<script>
	import Editor from '$lib/components/Editor.svelte';
	const start = '\n\n\n\n';
	const valueSolution = 'lol';
</script>

Whatever you put here, stays on your computer.

<Editor valueStart={start} {valueSolution} classes="bg-surface-950-50 text-surface-50-950"/>
