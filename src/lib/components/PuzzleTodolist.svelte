<script>
	import { Square, SquareCheckBig } from '@lucide/svelte';
	let { cmdLog, todoList, editorView = $bindable() } = $props();

	const removeFromHistory = (todo) => {
		console.log('remove', todo);
		cmdLog.list.forEach((item, idx) => {
			if (item.combo === todo) {
				cmdLog.list[idx].combo = 'removed';
			}
		});
	};
	$effect(() => {
		if (cmdLog.list.lengt > 1) {
			console.log(cmdLog.list[cmdLog.list.length - 1].description.combo);
		}
	});
</script>

<div class="mt-4">
	{#each todoList as todo, i}
		<button
			class="relative mt-2 flex items-center justify-center gap-4 px-1"
			onclick={(ev) => {
				removeFromHistory(todo);
				editorView.focus();
				ev.preventDefault();
			}}
		>
			{#if cmdLog.list.some((item) => {
				return item.description.combo === todo;
			})}
				<SquareCheckBig size="25" />
			{:else}
				<Square size="25" />
			{/if}
			<p class=" text-lg">{todo}</p>
		</button>
	{/each}
</div>
