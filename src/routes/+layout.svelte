<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	export const prerender = true;

	let { children } = $props();

	const menuNormalClass = 'text-surface-800-200';
	const menuActiveClass = '!text-white-500 text-lg font-bold';

	const parts = [
		{ slug: 'about', name: 'About' },
		{ slug: 'learn', name: 'Learn' },
		{ slug: 'puzzles', name: 'Puzzles' },
		{ slug: 'editor', name: 'Editor' },
		{ slug: 'contribute', name: 'Contribute' }
	];
	const testPage = (slug) => {
		return `${page.url.pathname}/`.includes(`/${slug}/`);
	};
</script>

<!-- <div class="absolute w-full p-4"> -->
<!-- <div class="absolute top-1 left-1 h-16 w-[60vw] border-3 bg-surface-50-950 p-4"></div> -->
<!-- <div class="absolute top-7 left-7 h-16 w-[60vw] border-3 bg-surface-50-950 p-4"></div> -->
<!-- <nav class="absolute top-5 left-5 h-16 w-[60vw] border-3 bg-surface-50-950 p-4"> -->
<!-- </div> -->
<nav class="flex w-full justify-around border-t-3 bg-surface-50-950 p-2">
	<ul class="flex justify-center gap-8">
		{#each parts as part}
			<li>
				<a class={[menuNormalClass, testPage(part.slug) && menuActiveClass]} href={`/${part.slug}`}
					>{part.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<div class="mb-50 bg-surface-50-950 p-2 px-10">
	{@render children()}
</div>
