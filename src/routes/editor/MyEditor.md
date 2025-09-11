<script>
	import Editor from '$lib/components/Editor.svelte';
	const start = '\n\n\n\n';
	const valueSolution = 'lol';
	let value = $state('');
</script>

**Wichtig:** Egal was du hier schreibst, es bleibt auf deinem Computer.

**Tipp:** For enhanced privacy, open this page in an incognito-tab and turn off all browser add-ons.

<Editor bind:value valueStart={start} {valueSolution} classes="overflow-y-auto bg-surface-50 text-surface-950 border-3 border-surface-500"/>

<!-- Display value with all whitespaces and \n -->
<div class="mt-200 text-xs">
	<p class="font-bold">Input as a string:</p>
	<pre class="">{@html JSON.stringify(value).slice(1, -1)}</pre>
</div>
