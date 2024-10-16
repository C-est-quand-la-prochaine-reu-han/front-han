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
			<ProfilLeftView @close="$emit('close')" />
		</Suspense>

		<Suspense>
			<ProfilRightView />
		</Suspense>

	</div>

	<div v-if="showProfil" class="very-bottom-button">
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

	.very-bottom-button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 100px;
		margin-bottom: 100px;
	}

	.very-bottom-button button {
		padding: 10px 20px;
		background-color: var(--vt-c-black-soft);
		border: none;
		cursor: pointer;
	}

	body.light-mode .very-bottom-button button {
		background-color: var(--vt-c-white-soft);
	}

	.very-bottom-button button:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .very-bottom-button button:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
