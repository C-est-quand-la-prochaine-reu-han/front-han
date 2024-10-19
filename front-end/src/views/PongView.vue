<script setup>
	// Get the token
	import { useAuthStore } from '../stores/auth.js';
	const authStore = useAuthStore();
	const token = authStore.token;

	import { ref, onMounted, computed, inject, onBeforeUnmount, defineEmits } from 'vue';
	import Paddle from './PongTools/Paddle.vue';
	import Ball from './PongTools/Ball.vue';
	
	import { get_me } from '/src/jspong/main.js';

	defineEmits(['close-game']);

	const globalState = inject('globalState');
	const otherPlayerName = inject('otherPlayerName');

	console.log(otherPlayerName.value);

	let playerOnRight = false;

	class Player {
		x = 0;
		y = 450;
		score = 0;
		name = "";
	}

	class Balle {
		x = 400;
		y = 400;
		dirX = 0;
		dirY = 0;
		name = "Baballe";
	}

	let ball = ref(new Balle());
	const ball_style = computed(() => ({
		top: ball.value.y * 0.8 - 10 + 'px',
		left: ball.value.x * 0.8 - 10 + 'px'
	}));
	
	let controlled_player = ref(new Player());
	controlled_player.value.name = "";
	const controlled_player_style = computed(() => ({
		top: controlled_player.value.y * 0.8 + 'px',
		left: controlled_player.value.x * 0.8 + 'px'
	}));
	
	let other_player = ref(new Player());
	const other_player_style = computed(() => ({
		top: other_player.value.y * 0.8 + 'px',
		left: other_player.value.x * 0.8 + 'px'
	}));

	const gameOverMessage = ref("");
	const isGameOver = ref(false);

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

				if (controlled_player.value.score >= 10 || other_player.value.score >= 10)
				{
					clearInterval(updateInterval);
					socket.close();
					if (controlled_player.value.score >= 10)
						gameOverMessage.value = "You win!";
					else
						gameOverMessage.value = "You lose!";
					alert(gameOverMessage.value);
					isGameOver.value = true;
					return;
				}

				if ((heldKeys.ArrowUp - heldKeys.ArrowDown) < 0)
					socket.send("down");
				else if ((heldKeys.ArrowUp - heldKeys.ArrowDown) > 0)
					socket.send("up");
			}, 10);
		}
		if (event.data === "youare:1")
		{
			controlled_player.value.x = 100;
			other_player.value.x = 900;
		}
		if (event.data === "youare:2")
		{
			playerOnRight = true;
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
			ball.value.x = 400;
			ball.value.y = 400;
			// Update scores in the global state
			if (playerOnRight) {
				globalState.rightPlayerScore = controlled_player.value.score;
				globalState.leftPlayerScore = other_player.value.score;
			} else {
				globalState.leftPlayerScore = controlled_player.value.score;
				globalState.rightPlayerScore = other_player.value.score;
			}
		}
		if (event.data.startsWith("opponent:"))
		{
			other_player.value.name = event.data.split(":", 2)[1];
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
				event.target.send("*");
				event.target.send(token);
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
		try {
			const player = await get_me(token);
			controlled_player.value.name = player.user_nick;
			socket = await setup_socket();
			window.addEventListener('keydown', keydown);
			window.addEventListener('keyup', keyup);
		} catch (e) {
			console.error(e);
			alert("u dummy");
		}
	});

	onBeforeUnmount(() => {
		window.removeEventListener('keydown', keydown);
		window.removeEventListener('keyup', keyup);
		clearInterval(updateInterval);
		socket.close();
	});
</script>

<template>
	<button class="back-button" v-if="isGameOver" @click="$emit('close-game')">
		<h1>←</h1>
	</button>

	<div class="game-field">
		<div class="middle-line-left"></div>
		<div class="middle-line-right"></div>

		<Paddle class="left-paddle" :style="controlled_player_style" />

		<Paddle class="right-paddle" :style="other_player_style" />

		<Ball class="ball" :style="ball_style" />
	</div>
</template>

<style scoped>
	.back-button {
		position: fixed;
		top: 100px;
		left: 50px;
		padding: 0 15px;
		border: none;
		cursor: pointer;
		z-index: 10;
	}

	.back-button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .back-button:hover {
		background-color: var(--vt-c-white-mute);
	}

	.game-field {
		margin: auto;
		width: 810px;
		height: 810px;
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
	}
</style>
