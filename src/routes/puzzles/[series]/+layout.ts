import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    const res = await fetch('/data/puzzles.json');
    let puzzles = await res.json();
    let len = puzzles?.[params.series]?.length
    const is_solved_array = Array(len).fill(false); // len x [false]
    return {is_solved_array};
}