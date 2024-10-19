<!--
 Il faut pouvoir distinguer quand on lance une partie contre le bot ou contre quelqu'un selon si on clique sur 'Partie rapide (solo)' ou 'Partie rapide (duo)'.
-->

<script setup>
	import { provide, ref } from 'vue';
	import { useAuthStore } from '../stores/auth.js';
	import ProfilView from './ProfilView.vue';
	import AllPlayersView from './AllPlayersView.vue';
	import GameView from './GameView.vue';
	import TournamentView from './TournamentView.vue';
	import { get_me } from '/src/jspong/main.js';

	const showMainMenu = ref(true);
	const showProfil = ref(false);
	const showAllPlayers = ref(false);
	const showPlayNowSolo = ref(false);
	const showPlayNowDuo = ref(false);
	const showTournament = ref(false);
	const otherPlayerName = ref('');
	const authStore = useAuthStore();
	const token = authStore.token;

	provide('otherPlayerName', otherPlayerName);

	try {
		let me = get_me(token);
		console.log(me);
	} catch (error) {
		console.log(error);
	}


	//showMainMenu.value = sessionStorage.getItem("showMainMenu") || showMainMenu.value;
	//showProfil.value = sessionStorage.getItem("showProfil") || showProfil.value;

	function toggleProfil() {
		showProfil.value = !showProfil.value;
		showMainMenu.value = !showMainMenu.value;
	//	sessionStorage.setItem("showProfil", showProfil.value);
	//	sessionStorage.setItem("showMainMenu", showMainMenu.value);
	}

	function toggleAllPlayers() {
		showAllPlayers.value = !showAllPlayers.value;
		showMainMenu.value = !showMainMenu.value;
	}

	function togglePlayNowSolo() {
		if (!showPlayNowSolo.value)
			otherPlayerName.value = 'bot';
		showPlayNowSolo.value = !showPlayNowSolo.value;
		showMainMenu.value = !showMainMenu.value;
	}

	function togglePlayNowDuo() {
		if (!showPlayNowDuo.value)
			otherPlayerName.value = '*';
		showPlayNowDuo.value = !showPlayNowDuo.value;
		showMainMenu.value = !showMainMenu.value;
	}

	function toggleTournament() {
		showTournament.value = !showTournament.value;
		showMainMenu.value = !showMainMenu.value;
	}
</script>

<template>
	<div v-if="showMainMenu" class="menu-container">
		<div class="menu-item">
			<button @click="toggleProfil">PROFIL</button>
		</div>
		<div class="menu-item">
			<button @click="toggleAllPlayers">LISTE DES JOUEUR·SE·S</button>
		</div>
		<div class="menu-item">
			<button @click="togglePlayNowSolo">PARTIE RAPIDE (SOLO)</button>
			<!-- <button>PARTIE RAPIDE (SOLO)</button> -->
		</div>
		<div class="menu-item">
			<button @click="togglePlayNowDuo">PARTIE RAPIDE (DUO)</button>
		</div>
		<div class="menu-item">
			<button @click="toggleTournament">TOURNOIS</button>
		</div>
	</div>

	<ProfilView v-if="showProfil" @close="toggleProfil" />

	<Suspense>
		<AllPlayersView v-if="showAllPlayers" @close="toggleAllPlayers" />
	</Suspense>

	<GameView v-if="showPlayNowSolo" @close-game="togglePlayNowSolo" />

	<GameView v-if="showPlayNowDuo" @close-game="togglePlayNowDuo" />

	<Suspense>
		<TournamentView v-if="showTournament" @close="toggleTournament" />
	</Suspense>
</template>

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
