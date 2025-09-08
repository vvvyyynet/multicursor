import type { PageLoad } from './$types';
import { building } from '$app/environment';

export const load: PageLoad = async ({ params, url }) => {

	return {
		slugOfSeries: params.series,
		slugOfPuzzle: !building ? url.searchParams.get('puzzle') : ""
	};
};
