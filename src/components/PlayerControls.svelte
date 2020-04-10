<script>
    import { webm } from ".././store/webm";
    import { player, currentTime } from ".././store/player";
    import Progress from "./Controls/Progress.svelte";

    $: isDisableNext = $webm.index === $webm.files.length;
    $: isDisablePrev = $webm.index === 0;

    const previousVideo = () => {
        webm.previousVideo();
        window.dispatchEvent(new CustomEvent("setScrollInto", {
            detail: {
                block: "nearest",
                inline: "center"
            }
        }))
    };

    const nextVideo = () => {
        webm.nextVideo();
        window.dispatchEvent(new CustomEvent("setScrollInto", {
            detail: false
        }))
    };

    function format (seconds) {
        if (isNaN(seconds)) return '...';
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) seconds = '0' + seconds;
        return `${minutes}:${seconds}`;
    }

    const handleVolume = () => {
        $player.volume = $player.volume ? 0 : localStorage.volume || 0.5;
        $player.volume = +$player.volume;
    };

    const handleInput = (e) => localStorage.volume = e.detail.value;
</script>

<template>
    <div class="controls-top">
        <div class="pull-left">
            1
        </div>
        <div class="name">
            <ion-icon name="document"></ion-icon>
            { $webm.files[$webm.index].name }
        </div>
        <div class="pull-right">
            3
        </div>
    </div>
    <div class="controls-bottom">
        <div class="buttons">
            <button class="control-btn" on:click={ previousVideo} disabled={isDisablePrev}>
                <ion-icon name="play-back"></ion-icon>
            </button>
            <button class="control-btn" on:click={() => $player.paused = !$player.paused}>
                <ion-icon name="{ $player.paused ? 'play' : 'pause'}"></ion-icon>
            </button>
            <button class="control-btn" on:click={nextVideo} disabled={isDisableNext}>
                 <ion-icon name="play-forward"></ion-icon>
            </button>
        </div>
        <div class="progresses">
            <div class="duration">
                <span>
                    { format($currentTime) }
                </span>
                <Progress min="0" max={$player.duration} bind:val={$currentTime}/>
                <span>
                    { format($player.duration) }
                </span>
            </div>
            <div class="volume">
                <span class="volume-ico" on:click={handleVolume}>
                    <ion-icon name="{ $player.volume === 0 ? 'volume-off' : 'volume-medium'}"></ion-icon>
                </span>
                <Progress on:input={handleInput} min="0" max=1 bind:val={$player.volume}/>
            </div>
        </div>
    </div>
</template>

<style>
    .controls-top, .controls-bottom {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        padding: 0 20px;
    }
    .controls-bottom {
        bottom: 0;
        top: auto;
        flex-direction: column;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%);
    }

    .pull-left {
        margin-right: auto;
    }
    .pull-right {
        margin-left: auto;
    }
    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .control-btn {
        font: inherit;
        background-color: transparent;
        border: none;
        color: white;
        font-size: 30px;
        outline: none;
        cursor: pointer;
        transition: .2s;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .control-btn:disabled {
        color: #a5a5a5;
        cursor: default;
    }
    .control-btn:hover  {
        background: #ff000078;
    }
    .control-btn:disabled:hover {
        background: transparent;
    }
    .progresses {
        display: flex;
        padding: 0px 10px 20px 10px;
        width: 100%;
    }
    .duration {
        display: flex;
        flex: 5 1 0;
        align-items: center;
        color: #fff;
    }
    .volume {
        flex: 1 1 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .duration span {
        color: #fff;
        font-size: 12px;
        padding: 0 10px;
    }
    .volume-ico {
        color: white;
        font-size: 20px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding: 0 10px;
    }
    .name {
        color: #ffffffbf;
        font-size: 12px;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #0000001f;
        margin: 10px 0;
        border-radius: 2px;
    }
</style>

