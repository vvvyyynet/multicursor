import type { PageLoad } from './$types';
import { page } from '$app/state';

export const load: PageLoad = async ({ params, url }) => {

	return {
		slugOfSeries: params.series,
		slugOfPuzzle: url.searchParams.get('puzzle')
	};
};
