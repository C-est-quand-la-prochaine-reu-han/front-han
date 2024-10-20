<template>
	<Suspense>
		<CreateTournamentView v-if="!isInTournament" @tournament-created="toggleIsInTournament" />
	</Suspense>

	<Suspense>
		<PlayInTournamentView v-if="isInTournament" />
	</Suspense>
</template>

<script setup>
	import { ref, provide } from 'vue';
	import { user_is_in_tournament, get_me } from '@/jspong/main.js';
	import { useAuthStore } from '@/stores/auth.js';
	import { useGameStore } from '@/stores/game.js';
	import CreateTournamentView from '@/components/tournament/CreateTournamentComponent.vue';
	import PlayInTournamentView from '@/components/tournament/PlayInTournamentComponent.vue';

	let tournamentId = -1;
	const isInTournament = ref(false);
	const authStore = useAuthStore();
	const gameStore = useGameStore();
	const token = authStore.token;

	async function checkIsInTournament() {
		let me = null;
		try {
			me = await get_me(token);
		} catch (error) {
			console.log(error);
			return -1;
		}
		let tournamentId = -1;
		try {
			console.log(me.pk);
			tournamentId = await user_is_in_tournament(me.pk, token);
		} catch (error) {
			console.log(error);
		}
		return tournamentId;
	}

	const id = await checkIsInTournament();
	console.log("The user is in the tournament " + id);

	if (id === -1) {
		tournamentId = -1;
		isInTournament.value = false;
		console.log('Not in tournament');
	} else {
		tournamentId = id;
		isInTournament.value = true;
		gameStore.tournamentId = tournamentId;
		console.log('In tournament');
	}

	function toggleIsInTournament() {
		isInTournament.value = !isInTournament.value;
	}
</script>

<style>
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
</style>
