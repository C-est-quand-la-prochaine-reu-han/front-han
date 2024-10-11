<script setup>
	import { ref } from 'vue';
	import ProfilLeftView from './ProfilLeftView.vue';
	import ProfilRightView from './ProfilRightView.vue';
	import StatsView from './StatsView.vue';
	import MatchHistoryView from './MatchHistoryView.vue';

	const showProfil = ref(true);
	const showStats = ref(false);
	const showMatchHistory = ref(false);

	function toggleStats() {
		showStats.value = !showStats.value;
		showProfil.value = !showProfil.value;
	}

	function toggleMatchHistory() {
		showMatchHistory.value = !showMatchHistory.value;
		showProfil.value = !showProfil.value;
	}
</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<div class="profil-container" v-if="showProfil">

		<Suspense>
			<ProfilLeftView />
		</Suspense>

		<Suspense>
			<ProfilRightView />
		</Suspense>

	</div>

	<div v-if="showProfil">
		<button @click="toggleStats">Statistiques</button>

		<button @click="toggleMatchHistory">Historique des matchs</button>
	</div>

	<Suspense>
		<StatsView v-if="showStats" @close="toggleStats" />
	</Suspense>

	<Suspense>
		<MatchHistoryView v-if="showMatchHistory" @close="toggleMatchHistory" />
	</Suspense>
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

	.profil-container {
		display: flex;
		flex-direction: row;
		margin: auto;
		height: 460px;
	}
</style>
