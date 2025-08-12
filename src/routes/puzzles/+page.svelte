<script lang="ts">
	const seriesData = [
		{
			title1: 'Demo',
			title2: 'Puzzle',
			link: '/puzzles/demo',
			text: 'Random Demo examples',
			footer1: 'by Levyn',
			footer2: 'Easy',
			imgSrc: '/img/preview-demo.png'
		},
		{
			title1: 'Real Examples',
			title2: 'Puzzle',
			link: '/puzzles/real',
			text: 'Some real examples from daily practice',
			footer1: 'by Levyn',
			footer2: 'Medium to hard',
			imgSrc: '/img/preview-llm.png'
		}
	];
</script>

{#snippet card({ imgSrc, link, title1, title2, text, footer1, footer2 })}
	<a
		href={link}
		class="block max-w-md divide-y divide-surface-200-800 overflow-hidden card border-[1px] border-surface-200-800 preset-filled-surface-100-900 card-hover"
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

<div class="flex flex-row gap-5">
	{#each seriesData as series}
		{@render card(series)}
	{/each}
</div>
