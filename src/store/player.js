import { writable } from 'svelte/store';

function createStore() {

    const state = {
        paused: true,
        duration: 0,
        volume: localStorage.volume === undefined ? 0.5 : +localStorage.volume
    };

    const { subscribe, set } = writable(state);

    return {
        subscribe, set
    };
}

export const player = createStore();
export const currentTime = writable(0);

