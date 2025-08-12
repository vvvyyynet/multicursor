<script lang="ts">
	const seriesData = [
		{
			title1: 'Editor Basics',
			title2: 'Puzzles',
			link: '/puzzles/editor-basics',
			text: 'Learn how to efficiently navigate and select text in the editor.',
			footer1: 'by Levyn',
			footer2: 'Easy',
			imgSrc: '/img/preview-demo.png'
		},
		{
			title1: 'Multicursor Basics',
			title2: 'Puzzles',
			link: '/puzzles/multicursor-basics',
			text: 'Learn the keybindings to enter multicursor editing',
			footer1: 'by Levyn',
			footer2: 'Easy',
			imgSrc: '/img/preview-demo.png'
		},
		{
			title1: 'Multicursor Advanced',
			title2: 'Puzzles',
			link: '/puzzles/multicursor-advanced',
			text: 'Learn smart patterns to make multicursor editing more efficient',
			footer1: 'by Levyn',
			footer2: 'Medium',
			imgSrc: '/img/preview-demo.png'
		},
		{
			title1: 'Format conversions',
			title2: 'Puzzles',
			link: '/puzzles/format-conversions',
			text: 'Learn how to apply multicursor techniques for format conversions',
			footer1: 'by Levyn',
			footer2: 'Medium',
			imgSrc: '/img/preview-demo.png'
		},
		{
			title1: 'DH Special',
			title2: 'Puzzles',
			link: '/puzzles/dh-special',
			text: 'A set of examples made for DH-scholars',
			footer1: 'by Levyn',
			footer2: 'Medium',
			imgSrc: '/img/preview-demo.png'
		},
		{
			title1: 'Edge Cases',
			title2: 'Puzzles',
			link: '/puzzles/edge-cases',
			text: 'Test the limits of multicursor editing',
			footer1: 'by Levyn',
			footer2: 'Hard',
			imgSrc: '/img/preview-demo.png'
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
