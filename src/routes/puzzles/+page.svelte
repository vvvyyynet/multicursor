<script lang="ts">
	import { base } from '$app/paths';
	let { data } = $props();
</script>

{#snippet card({ slug, title1, title2, text, footer1, footer2, imgSrc })}
	<div
		class={[
			'm-4 block max-w-md divide-y divide-surface-200-800 overflow-hidden card border-[1px] border-surface-200-800 preset-filled-surface-100-900 card-hover'
		]}
	>
		<a
			href={`${base}/puzzles/${slug}`}
			class={[
				slug !== 'editor-basics' &&
					'pointer-events-none cursor-not-allowed text-gray-500 opacity-50'
			]}
		>
			<header>
				<!-- <img src={`${base}/${imgSrc}`} class="aspect-[21/9] w-full" alt="banner" /> -->
				<img
					src="https://cdn.pixabay.com/photo/2016/02/13/13/40/keys-1197848_1280.jpg"
					class="aspect-[3/2] w-full"
					alt="banner"
				/>
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
	</div>
{/snippet}

<div class="mx-auto flex w-9/10 flex-row flex-wrap gap-10 pt-10">
	{#each data.setsList as set}
		{@render card(data.sets?.[set].desc)}
	{/each}
</div>
