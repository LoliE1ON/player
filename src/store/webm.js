import { writable } from 'svelte/store';
import { getFiles } from "../api";

function createStore() {

    const state = {
        files: [],
        boards: [],
        index: 0,
        autoPlay: false,
        totalVisible: 10,
    };

    const { subscribe, set, update } = writable({...state}, (set) => {
        getFiles().then(data => {
            return {
                ...data,
                files: data.files.sort(() => Math.random() - 0.5)
            }
        }).then(data => {
            console.log(data)
            return set({
                ...state,
                files: data.files,
            })
        });
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