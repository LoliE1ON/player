<script>
    import {createEventDispatcher} from "svelte";

    export let min = 0;
    export let max = 1;
    export let val;

    const dispatch = createEventDispatcher();

    function handleInput(e) {
        dispatch('input', {
            value: +e.target.value
        });
    }

</script>

<template>
    <div class="progress-hack">
        <input type="range" step="any" on:input={handleInput} bind:value={val} {max} {min} style="--min: {min};--max: {max};--val: {val}">
    </div>
</template>

<style>
    .progress-hack {
        width: 100%;
        --thumb-color: #fff;
        --track-color: rgba(255, 255, 255, 0.35);
        --fill-color: #ff0000;
    }
    [type=range] {
        --range: calc(var(--max) - var(--min));
        --ratio: calc((var(--val) - var(--min))/var(--range));
        --sx: calc(.5*0.6em + var(--ratio)*(100% - 0.6em));
        margin: 0;
        padding: 0;
        width: 100%;
        height: 0.6em;
        background: transparent;
        font: 1em/1 arial, sans-serif;
        outline: none;
        cursor: pointer;
    }
    [type=range], [type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    [type=range]::-webkit-slider-runnable-track {
        box-sizing: border-box;
        border: none;
        border-radius: 10px;
        width: 100%;
        height: 0.25em;
        background: var(--track-color);
    }
    .progress-hack [type=range]::-webkit-slider-runnable-track {
        background: linear-gradient(var(--fill-color), var(--fill-color)) 0/var(--sx) 100% no-repeat var(--track-color);
    }
    [type=range]::-moz-range-track {
        box-sizing: border-box;
        border: none;
        border-radius: 10px;
        width: 100%;
        height: 0.25em;
        background: var(--track-color)
    }
    [type=range]::-ms-track {
        box-sizing: border-box;
        border: none;
        border-radius: 10px;
        width: 100%;
        height: 0.25em;
        background: var(--track-color)
    }
    [type=range]::-moz-range-progress {
        height: 0.25em;
        background: var(--fill-color)
    }
    [type=range]::-ms-fill-lower {
        height: 0.25em;
        background: var(--fill-color)
    }
    [type=range]::-webkit-slider-thumb {
        margin-top: -0.175em;
        box-sizing: border-box;
        border: none;
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        background: var(--thumb-color)
    }
    [type=range]::-moz-range-thumb {
        box-sizing: border-box;
        border: none;
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        background: var(--thumb-color)
    }
    [type=range]::-ms-thumb {
        margin-top: 0;
        box-sizing: border-box;
        border: none;
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        background: var(--thumb-color)
    }
    [type=range]::-ms-tooltip {
        display: none;
    }
</style>