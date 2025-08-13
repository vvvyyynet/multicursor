import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const res = await fetch('/data/puzzles.json');
    let json = await res.json();
    let setsList = json.setsList;
    let puzzles = json.puzzles;
    return {setsList, puzzles};
}