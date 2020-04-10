<script>
    import PlayerControls from "./PlayerControls.svelte";
    import { webm } from ".././store/webm";

    let paused = true;
    let currentTime = 0;
    let duration = 0;
    let volume = localStorage.volume === undefined ? 0.5 : +localStorage.volume;


</script>

<template>
    <div class="player">

        {#if $webm.files[$webm.index] }
            <video
                on:ended={webm.nextVideo}
                bind:paused={paused}
                bind:currentTime={currentTime}
                bind:duration={duration}
                bind:volume={volume}
                autoplay={$webm.autoPlay}
                src={ $webm.files[$webm.index].path }
            ></video>

            <PlayerControls
                    bind:paused={paused}
                    bind:currentTime={currentTime}
                    bind:duration={duration}
                    bind:volume={volume}
            />
        {:else}
            LOADING...
        {/if}
    </div>
</template>

<style>
    video {
        max-height: 100%;
        object-fit: contain;
        width: 100%;
        height: auto;
    }
    .player {
        position: relative;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>