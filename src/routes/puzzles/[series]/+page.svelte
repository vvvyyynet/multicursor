<script>
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	onMount(() => {
		goto(`${base}${page.url.pathname}/1`, { replaceState: true });
	});
</script>
