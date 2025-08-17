<script lang="ts">
	let { data } = $props();
</script>

{#snippet card({ slug, title1, title2, text, footer1, footer2, imgSrc })}
	<a
		href={`/puzzles/${slug}`}
		class={[
			'block max-w-md divide-y divide-surface-200-800 overflow-hidden card border-[1px] border-surface-200-800 preset-filled-surface-100-900 card-hover',
			slug !== 'editor-basics' && 'pointer-events-none cursor-not-allowed text-gray-500 opacity-50'
		]}
	>
		<header>
			<img src={imgSrc} class="aspect-[21/9] w-full" alt="banner" />
		</header>
		<article class="space-y-4 p-4">
			<div>
				<h2 class="h6">{title2}</h2>
				<h3 class="h3">{title1}</h3>
			</div>
			<p class="opacity-60">
				{text}
			</p>
		</article>
		<footer class="flex items-center justify-between gap-4 p-4">
			<small class="opacity-60">{footer1}</small>
			<small class="opacity-60">{footer2}</small>
		</footer>
	</a>
{/snippet}

<div class="flex flex-row flex-wrap gap-10">
	{#each data.setsList as set}
		{@render card(data.sets?.[set].desc)}
	{/each}
</div>
