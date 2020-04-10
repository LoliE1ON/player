import { writable } from 'svelte/store';
import { getFiles } from "../api";

function createStore() {

    const state = {
        files: [],
        index: 0,
        autoPlay: false,
        totalVisible: 10,
    };

    const { subscribe, set, update } = writable({...state}, (set) => {
        getFiles().then(files => files.sort(() => Math.random() - 0.5)).then(files => set({...state, files}));
        return () => false;
    });

    return {
        subscribe,
        nextVideo: () => update(state => {
            return {
                ...state,
                autoPlay: true,
                index: state.index + 1 > state.files.length ? state.index : state.index + 1
            };
        }),
        previousVideo: () => update(state => {
            return {
                ...state,
                autoPlay: true,
                index: state.index - 1 < 0 ? 0 : state.index - 1
            };
        }),
        incrementVisible: () => update(state => {
            return {
                ...state,
                totalVisible: state.totalVisible +10,
            };
        }),
        changeVideo: (i) => update(state => {
            return {
                ...state,
                index: i,
                autoPlay: true,
            };
        }),
    };
}

export const webm = createStore();