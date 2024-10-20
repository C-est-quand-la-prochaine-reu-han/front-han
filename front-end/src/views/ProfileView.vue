<template>
	<div class="profil-container" v-if="showProfil">
		<Suspense>
			<ProfileLeftComponent @close="$emit('close')" />
		</Suspense>

		<Suspense>
			<ProfileRightComponent />
		</Suspense>
	</div>

	<div v-if="showProfil" class="very-bottom-button">
		<button @click="toggleStats">Statistiques</button>
		
		<button @click="toggleMatchHistory">Historique des matchs</button>

		<button @click="toggleTournamentHistory">Historique des tournois</button>

		<button @click="toggleRGPD">Politique de confidentialité</button>
	</div>

	<Suspense>
		<StatsComponent v-if="showStats" @close="toggleStats" />
	</Suspense>

	<Suspense>
		<MatchHistoryComponent v-if="showMatchHistory" @close="toggleMatchHistory" />
	</Suspense>

	<Suspense>
		<TournamentHistoryComponent v-if="showTournamentHistory" @close="toggleTournamentHistory" />
	</Suspense>

	<RGPDComponent v-if="showRGPD" @close="toggleRGPD" />
</template>

<script setup>
	import { ref } from 'vue';
	import MatchHistoryComponent from '@/components/profile/MatchHistoryComponent.vue';
	import TournamentHistoryComponent from '@/components/profile/TournamentHistoryComponent.vue';
	import ProfileLeftComponent from '@/components/profile/ProfileLeftComponent.vue';
	import ProfileRightComponent from '@/components/profile/ProfileRightComponent.vue';
	import RGPDComponent from '@/components/profile/RGPDComponent.vue';
	import StatsComponent from '@/components/profile/StatsComponent.vue';

	const showProfil = ref(true);
	const showStats = ref(false);
	const showTournamentHistory = ref(false);
	const showMatchHistory = ref(false);
	const showRGPD = ref(false);

	function toggleStats() {
		showStats.value = !showStats.value;
		showProfil.value = !showProfil.value;
	}

	function toggleMatchHistory() {
		showMatchHistory.value = !showMatchHistory.value;
		showProfil.value = !showProfil.value;
	}

	function toggleRGPD() {
		showRGPD.value = !showRGPD.value;
		showProfil.value = !showProfil.value;
	}

	function toggleTournamentHistory() {
		showTournamentHistory.value = !showTournamentHistory.value;
		showProfil.value = !showProfil.value;
	}
</script>

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
