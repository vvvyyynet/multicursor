<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<!-- <div class="absolute w-full p-4"> -->
<!-- <div class="absolute top-1 left-1 h-16 w-[60vw] border-3 bg-surface-50-950 p-4"></div> -->
<!-- <div class="absolute top-7 left-7 h-16 w-[60vw] border-3 bg-surface-50-950 p-4"></div> -->
<!-- <nav class="absolute top-5 left-5 h-16 w-[60vw] border-3 bg-surface-50-950 p-4"> -->
<!-- </div> -->
<nav class="m-2 mx-6 border-3 bg-surface-50-950 p-4">
	<ul class="flex justify-start gap-8">
		<li><a href="/about">About</a></li>
		<li><a href="/learn">Learn</a></li>
		<li><a href="/puzzles">Puzzles</a></li>
		<li><a href="/editor">Editor</a></li>
		<li><a href="/contribute">Contribute</a></li>
	</ul>
</nav>

<div class="mb-50 p-10">
	{@render children()}
</div>
