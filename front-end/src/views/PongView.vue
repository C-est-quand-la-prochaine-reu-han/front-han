<script setup>
	import { ref, onMounted, reactive, computed } from 'vue';
	import Paddle from './PongTools/Paddle.vue';
	import Ball from './PongTools/Ball.vue';

	// STYLE

	class Player {
		x = 100;
		y = 450;
		score = 0;
		name = "";
	}

	class Balle {
		x = 500;
		y = 500;
		dirX = 0;
		dirY = 0;
		name = "Baballe";
	}

	let controlled_player = new Player();
	let other_player = new Player();

	let ball = ref(new Balle());

	const themeObject = reactive({
		top: ball.y + 'px',
		left: ball.x + 'px'
	});

	const ball_style = computed(() => ({
		top: themeObject.top,
		left: themeObject.left
	}));

	function handle_socket(event)
	{
		if (event.data === "start")
		{
			var old_time = undefined;
			setInterval(function () {
				// Time calculation
				var time = new Date();
				let delta = (time - old_time) / 1000;
				old_time = time;

				// Ball update
				ball.x = ball.x + delta * ball.dirX;
				ball.y = ball.y + delta * ball.dirY;

				// Real coordinates
				let ball_x = ball.x;
				let ball_y = ball.y * 600 / 1000;

				// CSS update
				themeObject.left = ball_x + "px";
				themeObject.top = ball_y + "px";

			}, 10);
		}
		if (event.data === "youare:1")
		{
			other_player.x = 900;
			controlled_player.x = 100;
		}
		if (event.data === "youare:2")
		{
			other_player.x = 100;
			controlled_player.x = 900;
		}
		if (event.data.startsWith("score:"))
		{
			let data = event.data.split(":");
			if (data[1] == controlled_player.name)
				controlled_player.score = parseInt(data[2]);
			else if (data[1] == other_player.name)
				other_player.score = parseInt(data[2]);
			ball.x = 500;
			ball.y = 500;
		}
		if (event.data.startsWith("opponent:"))
		{
			other_player.name = event.data.split(":", 2)[1];
			controlled_player.name = "";
		}
		if (event.data.startsWith("mov:"))
		{
			let newdir = event.data.split(":")
			ball.dirY = parseInt(newdir[1]);
			ball.dirX = parseInt(newdir[2]);
		}
		if (event.data.startsWith("pos:"))
		{
			let newpos = event.data.split(":");
			ball.x = parseInt(newpos[2]);
			ball.y = parseInt(newpos[1]);
			let ball_x = ball.x;
			let ball_y = ball.y * 600 / 1000;
			themeObject.left = ball_x + "px";
			themeObject.top = ball_y + "px";
		}
		if (controlled_player === undefined || other_player === undefined)
			return ;
		if (event.data.startsWith(controlled_player.name + ":"))
		{
			let newpos = event.data.split(":");
			controlled_player.y = parseInt(newpos[1]);
			controlled_player.x = parseInt(newpos[2]);
		}
		if (event.data.startsWith(other_player.name + ":"))
		{
			let newpos = event.data.split(":");
			other_player.y = parseInt(newpos[1]);
			other_player.x = parseInt(newpos[2]);
		}
	}

	async function setup_socket()
	{
		let socket = await new WebSocket("wss://localhost:8443/pong/");
		socket.onopen = function (event)
		{
			event.target.send("oui" + socket);
		}
		socket.onmessage = handle_socket;
	}

	var socket;

	onMounted(async () => {
		socket = setup_socket();
	});
</script>

<template>
	<div class="game-field">
		<div class="middle-line-left"></div>
		<div class="middle-line-right"></div>

		<Paddle class="left-paddle" style="top: { controlled_player.x }px; left: { controlled_player.y }px;" />

		<Paddle class="right-paddle" style="top: { other_player.x }px; left: { other_player.y }px;" />

		<Ball class="ball" :style="ball_style" />
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
	}

	.left-paddle {
		position: absolute;
	}

	.right-paddle {
		position: absolute;
		right: 15px;
		top: 225px;
	}
</style>
