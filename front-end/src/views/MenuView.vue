<script setup>
	import { ref } from 'vue'
	import ProfilView from './ProfilView.vue';
	import GameView from './GameView.vue';
	import StatsView from './StatsView.vue';

	const showMainMenu = ref(true)
	const showProfil = ref(false)
	const showStats = ref(false)
	const showPlayNowSolo = ref(false)
	// const showPlayNowDuo = ref(false)
	// const showTournament = ref(false)

	function toggleProfil() {
		showProfil.value = !showProfil.value
		showMainMenu.value = !showMainMenu.value
	}

	function toggleStats() {
		showStats.value = !showStats.value
		showMainMenu.value = !showMainMenu.value
	}

	function togglePlayNowSolo() {
		showPlayNowSolo.value = !showPlayNowSolo.value
		showMainMenu.value = !showMainMenu.value
	}

	// function togglePlayNowDuo() {
	// 	showPlayNowDuo.value = !showPlayNowDuo.value
	// 	showMainMenu.value = !showMainMenu.value
	// }

	// function togglesTournament() {
	// 	showTournament.value = !showTournament.value
	// 	showMainMenu.value = !showMainMenu.value
	// }
</script>

<template>
	<div v-if="showMainMenu" class="menu-container">
		<div class="menu-item">
			<button @click="toggleProfil">PROFIL</button>
		</div>
		<div class="menu-item">
			<button @click="toggleStats">STATISTIQUES</button>
		</div>
		<div class="menu-item">
			<button @click="togglePlayNowSolo">PARTIE RAPIDE (SOLO)</button>
		</div>
		<div class="menu-item">
			<button>PARTIE RAPIDE (DUO)</button>
		</div>
		<div class="menu-item">
			<button>TOURNOIS</button>
		</div>
	</div>

	<ProfilView v-if="showProfil" @close="toggleProfil" />

	<GameView v-if="showPlayNowSolo" @close="togglePlayNowSolo" />

	<Suspense>
		<StatsView v-if="showStats" @close="toggleStats" />
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
