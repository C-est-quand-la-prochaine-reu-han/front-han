<script setup>
	import { ref, onMounted, computed, inject, onBeforeUnmount } from 'vue';
	import Paddle from './PongTools/Paddle.vue';
	import Ball from './PongTools/Ball.vue';

	const globalState = inject('globalState');

	class Player {
		x = 40;
		y = 425;
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

	let ball = ref(new Balle());
	const ball_style = computed(() => ({
		top: ball.value.y * 600 / 1000 - 25 + 'px',
		left: ball.value.x - 25 + 'px'
	}));
	
	let controlled_player = ref(new Player());
	const controlled_player_style = computed(() => ({
		top: controlled_player.value.y * 600 / 1000 + 'px',
		left: controlled_player.value.x + 'px'
	}));
	
	let other_player = ref(new Player());
	const other_player_style = computed(() => ({
		top: other_player.value.y * 600 / 1000 + 'px',
		left: other_player.value.x + 'px'
	}));

	let updateInterval;

	function handle_socket(event)
	{
		if (event.data === "start")
		{
			var old_time = undefined;
			updateInterval = setInterval(function () {
				// Time calculation
				var time = new Date();
				let delta = (time - old_time) / 1000;
				old_time = time;
				if (isNaN(delta)) return;

				// Ball update
				ball.value.x += delta * ball.value.dirX;
				ball.value.y += delta * ball.value.dirY;

				// // Real coordinates
				// let ball_x = ball.value.x;
				// let ball_y = ball.value.y * 600 / 1000;

				// // CSS update
				// themeBall.left = ball_x + "px";
				// themeBall.top = ball_y + "px";

				if ((heldKeys.ArrowUp - heldKeys.ArrowDown) < 0)
					socket.send("down");
				else if ((heldKeys.ArrowUp - heldKeys.ArrowDown) > 0)
					socket.send("up");
				//controlled_player.value.y = Math.min(900, Math.max(0, controlled_player.value.y + (heldKeys.ArrowDown - heldKeys.ArrowUp) * 300 * delta));
				//themeControlledPlayer.top = controlled_player.y + 'px';
			}, 10);
		}
		if (event.data === "youare:1")
		{
			controlled_player.value.x = 100;
			other_player.value.x = 900;
		}
		if (event.data === "youare:2")
		{
			controlled_player.value.x = 900;
			other_player.value.x = 100;
		}
		if (event.data.startsWith("score:"))
		{
			let data = event.data.split(":");
			if (data[1] == controlled_player.value.name)
				controlled_player.value.score = parseInt(data[2]);
			else if (data[1] == other_player.value.name)
				other_player.value.score = parseInt(data[2]);
			ball.value.x = 500;
			ball.value.y = 500;
			// Update scores in the global state
			globalState.controlledPlayerScore = controlled_player.value.score;
			globalState.otherPlayerScore = other_player.value.score;
		}
		if (event.data.startsWith("opponent:"))
		{
			other_player.value.name = event.data.split(":", 2)[1];
			//controlled_player.value.name = "";
		}
		if (event.data.startsWith("mov:"))
		{
			let newdir = event.data.split(":")
			ball.value.dirY = parseInt(newdir[1]);
			ball.value.dirX = parseInt(newdir[2]);
		}
		if (event.data.startsWith("pos:"))
		{
			let newpos = event.data.split(":");
			ball.value.x = parseInt(newpos[2]);
			ball.value.y = parseInt(newpos[1]);
			// let ball_x = ball.value.x;
			// let ball_y = ball.value.y * 600 / 1000;
			// themeBall.left = ball_x + "px";
			// themeBall.top = ball_y + "px";
		}
		if (controlled_player === undefined || other_player === undefined)
			return ;
		if (event.data.startsWith(controlled_player.value.name + ":"))
		{
			let newpos = event.data.split(":");
			controlled_player.value.y = parseInt(newpos[1]);
			controlled_player.value.x = parseInt(newpos[2]);
		}
		if (event.data.startsWith(other_player.value.name + ":"))
		{
			let newpos = event.data.split(":");
			other_player.value.y = parseInt(newpos[1]);
			other_player.value.x = parseInt(newpos[2]);
		}
	}

	async function setup_socket()
	{
		let socket = await new WebSocket("wss://localhost:8443/pong/");
		let promise = new Promise((resolve, reject) => {
			socket.onopen = function (event) {
				// FIXME: use actual player name from localstorage or api
				controlled_player.value.name = `player${new Date().getTime()}`;
				event.target.send(controlled_player.value.name);
				resolve(socket);
			}
		});
		socket.onmessage = handle_socket;
		return promise;
	}

	let heldKeys = {
		ArrowUp: false,
		ArrowDown: false,
		w: false,
		s: false
	}

	let socket;

	const keydown = event => {
		if (heldKeys.hasOwnProperty(event.key)) {
			heldKeys[event.key] = true;
		}
	};
	const keyup = event => {
		if (heldKeys.hasOwnProperty(event.key)) {
			heldKeys[event.key] = false;
		}
	};

	onMounted(async () => {
		socket = await setup_socket();

		window.addEventListener('keydown', keydown);
		window.addEventListener('keyup', keyup);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('keydown', keydown);
		window.removeEventListener('keyup', keyup);
		clearInterval(updateInterval);
		socket.close();
	});
</script>

<template>
	<div class="game-field">
		<div class="middle-line-left"></div>
		<div class="middle-line-right"></div>

		<Paddle class="left-paddle" :style="controlled_player_style" />

		<Paddle class="right-paddle" :style="other_player_style" />

		<Ball class="ball" :style="ball_style" />
	</div>
</template>

<style scoped>
	.game-field {
		margin: auto;
		width: 1010px;
		height: 610px;
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
