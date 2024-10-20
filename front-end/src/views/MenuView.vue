<template>
	<div class="menu-container">
		<RouterLink class="menu-item" to="/profile">Profil</RouterLink>
		<RouterLink class="menu-item" to="/all-players">Liste des joueur·se·s</RouterLink>
		<RouterLink class="menu-item" @click="toggleOpponent('bot')" to="/game">Partie rapide (solo)</RouterLink>
		<RouterLink class="menu-item" @click="toggleOpponent('*')" to="/game">Partie rapide (duo)</RouterLink>
		<RouterLink class="menu-item" to="/tournament">Tournois</RouterLink>
	</div>
</template>

<script setup>
	import { provide, ref, onUnmounted } from 'vue';
	import { useAuthStore } from '@/stores/auth.js';
	import { useGameStore } from '@/stores/game';
	import { get_me } from '@/jspong/main.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	const gameStore = useGameStore();

	try {
		let me = get_me(token);
		console.log(me);
	} catch (error) {
		console.log(error);
	}

	function toggleOpponent(name) {
		gameStore.setOpponent(name);
	}


</script>

<style scoped>
	.menu-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
	}

	.menu-item {
		background-color: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menu-item:nth-child(3) {
		grid-column: 1 / span 2;
	}

	button {
		height: 100%;
		width: 100%;
	}

	button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.4s linear;
	}

	body.light-mode button:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
