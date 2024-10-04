<script setup>
	// import Paddle from './PongTools/Paddle.vue';
	// import Ball from './PongTools/Ball.vue';
</script>

<template>
	<div class="game-field">
		<div class="middle-line-left"></div>
		<div class="middle-line-right"></div>
	</div>
</template>

<style scoped>
	.game-field {
		margin: auto;
		width: 1000px;
		height: 600px;
		border: 5px;
		border-style: solid dashed;
		display: flex;
	}

	.middle-line-left {
		width: 100%;
		height: 100%;
		border-right: 5px dashed;
	}

	.middle-line-right {
		width: 100%;
		height: 100%;
		border-left: 5px dashed;
	}
</style>
