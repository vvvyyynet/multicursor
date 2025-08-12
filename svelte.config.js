import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md'],
			smartypants: {
				quotes: true,
				ellipses: true,
				backticks: true,
				dashes: 'oldschool'
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		})
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
