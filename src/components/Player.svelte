<script>
    import PlayerControls from "./PlayerControls.svelte";
    import { webm } from ".././store/webm";
    import { player, currentTime } from ".././store/player";

</script>

<template>
    <div class="player">

        {#if $webm.files[$webm.index] }
            <video
                on:ended={webm.nextVideo}
                bind:paused={$player.paused}
                bind:currentTime={$currentTime}
                bind:duration={$player.duration}
                bind:volume={$player.volume}
                autoplay={$webm.autoPlay}
                src={ $webm.files[$webm.index].path }
            ></video>

            <PlayerControls/>
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