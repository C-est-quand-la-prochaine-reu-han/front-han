<script setup>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

function toggleOpponent(name) {
	gameStore.setOpponent(name);
}
</script>

<template>
	<div class="menu-container">
		<RouterLink class="menu-item" to="/profile">Profil</RouterLink>
		<RouterLink class="menu-item" to="/all-players"
			>Liste des joueur·se·s</RouterLink
		>
		<RouterLink class="menu-item" @click="toggleOpponent('bot')" to="/game"
			>Partie rapide (solo)</RouterLink
		>
		<RouterLink class="menu-item" @click="toggleOpponent('*')" to="/game"
			>Partie rapide (duo)</RouterLink
		>
		<RouterLink class="menu-item" to="/tournament">Tournois</RouterLink>
	</div>
</template>

<style scoped>
.menu-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	height: 100vh;
	width: 100vw;
	box-sizing: border-box;
	text-transform: uppercase;
}

.menu-item {
	height: 100%;
	width: 100%;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
}

.menu-item:nth-child(3) {
	grid-column: 1 / span 2;
}

.menu-item:hover {
	background-color: var(--vt-c-black-mute);
	transition: background-color 0.4s linear;
}

body.light-mode .menu-item:hover {
	background-color: var(--vt-c-white-mute);
}
</style>
