<script>
	import Player from "./components/Player.svelte";
	import VideoList from "./components/VideoList.svelte";
</script>

<template>

	<div class="player-container">
		<Player/>
	</div>
	<VideoList/>
</template>

<style global>
	body {
		margin: auto;
		font-family: sans-serif;
		background: #151515;
	}
	* {
		box-sizing: border-box;
	}
	.player-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 400px;
	}
	/* width */
	::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #000000;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #f00;
		border-radius: 4px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #c00000;
	}
</style>