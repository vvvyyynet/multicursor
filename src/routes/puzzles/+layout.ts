import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('/data/puzzles.json');
    let json = await res.json();
    let setsList = json.setsList;
    let sets = json.sets;
    return {setsList, sets};
}