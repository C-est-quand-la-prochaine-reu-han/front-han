<script setup>
	import Paddle from './PongTools/Paddle.vue';
	import Ball from './PongTools/Ball.vue';
</script>

<template>
	<div class="game-field">
		<div class="middle-line-left"></div>
		<div class="middle-line-right"></div>

		<Paddle class="left-paddle" />

		<Paddle class="right-paddle" />

		<Ball class="ball" />
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
		position: relative;
	}

	.middle-line-left {
		width: 100%;
		height: 100%;
		border-right: 2px solid;
	}

	.middle-line-right {
		width: 100%;
		height: 100%;
		border-left: 2px solid;
	}

	.ball {
		position: absolute;
		left: 480px;
		top: 280px;
	}

	.left-paddle {
		position: absolute;
		left: 15px;
		top: 225px;
	}

	.right-paddle {
		position: absolute;
		right: 15px;
		top: 225px;
	}
</style>
