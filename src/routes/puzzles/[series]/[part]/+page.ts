import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch('/data/puzzles.json');
	const puzzles = await res.json()
	return {
		puzzle: puzzles?.[params.series]?.[params.part - 1] || 
		{
			n: params.part-1,
			title: '404',
			subtitle: 'This puzzle does not exist',
			explanation: '',
			valueStart: '',
			valueSolution: ''
		}
	};
};
