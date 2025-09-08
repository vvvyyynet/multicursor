import { solved } from '$lib/stores/stores.svelte';
import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${base}/data/puzzles.json`);
    let json = await res.json();
    let setsList = json.setsList;
    let sets = json.sets;
    
    // initialise solved array
    setsList.forEach(set => {
        solved[set] = Array(sets[set].length).fill(false);
    });

    // Return
    return {setsList, sets};
}