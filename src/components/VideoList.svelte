<script>
    import { webm } from ".././store/webm";
    import { afterUpdate } from "svelte";

    let ul;
    let scrollIntoOptions = false;

    // Lazy loading videos on end scroll
    const handleScroll = (e) => {
        if ((e.target.offsetHeight + e.target.scrollTop) >= (e.target.scrollHeight-10)) {
            webm.incrementVisible();
            scrollIntoOptions = "break";
        }
    };

    const setStatus = (e) => scrollIntoOptions = e.detail;
    const changeVideo = (i) => {
        scrollIntoOptions = false;
        webm.changeVideo(i);
    };

    // Controlling item position in list
    afterUpdate(() => {
        if (!ul || scrollIntoOptions === "break") return;
        const activeElement = ul.querySelector(".active");

        if (!activeElement) return;
        activeElement.scrollIntoView(scrollIntoOptions);
    });

</script>

<svelte:window on:setScrollInto={setStatus}/>

<template>
    <ul on:scroll={ handleScroll } bind:this={ ul }>
        {#each $webm.files as file, i}
            {#if  i < $webm.totalVisible}
                <li class:active={$webm.index === i} on:click={() => changeVideo(i)}>
                    <img alt={file.name} src={file.preview}/>
                    <div class="name">
                        {#if $webm.index === i}
                            <ion-icon name="play"></ion-icon>
                        {/if}
                        <span class="pl5">
                            {file.name}
                        </span>
                    </div>
                </li>
            {/if}
        {/each}
    </ul>
</template>

<style>
    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0;
        margin: 0;
        height: calc(100vh - 400px);
        overflow-y: scroll;
        position: relative;
    }
    img {
        width: 80px;
        height: 40px;
        object-fit: cover;
    }
    li {
        display: flex;
        align-items: center;
        cursor: pointer;
        border-bottom: 2px solid #101010;
        transition: .2s;
        color: #d9d9d9;
    }
    li:hover {
        background: #252525;
    }
    .pl5 {
        padding-left: 5px;
    }
    .name {
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        background: #0e0e0e!important;
        color: #e30000 !important;
    }
</style>