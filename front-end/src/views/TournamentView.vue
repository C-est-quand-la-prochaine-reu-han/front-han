<!--
 La variable 'isInTournament' est set a false par defaut mais il faut checker si le joueur est deja inscrit dans un tournois pour acceder a la page du tournois si c'est le cas.
 Si le joueur est deja inscrit dans un tournois, il va pouvoir lancer le jeu si c'est son tour de jouer.
 Si on peut jouer, il pourrait etre interessant de savoir ici contre qui on doit jouer.
 Dans le 'provide' il faut remplacer 'player' par le nom du joueur contre qui on doit jouer.
-->

<script setup>
	import { ref, provide } from 'vue';
	import { user_is_in_tournament, get_me } from '/src/jspong/main.js';
	import CreateTournamentView from './CreateTournamentView.vue';
	import PlayInTournamentView from './PlayInTournamentView.vue';
	import { useAuthStore } from '../stores/auth.js';

	const isInTournament = ref(false);
	const tournamentId = ref(null);
	const authStore = useAuthStore();
	const token = authStore.token;

	async function checkIsInTournament() {
		let me = {};
		try {
			me = await get_me(token);
		} catch (error) {
			me = null;
			console.log(error);
		}
		if (!me) {
			return -1;
		}
		console.log('ME');
		console.log(me);
		let final_value = -1;
		try {
			final_value = await user_is_in_tournament(me.pk, token);
		} catch (error) {
			console.log(error);
			return -1;
		}
		console.log
		if (final_value === -1) {
			return -1;
		}
		isInTournament.value = true;
		tournamentId.value = final_value;

		console.log("is it in a tournament ? " + 'isInTournament', isInTournament.value);
		console.log("what is the tournament id ? " + 'tournamentId', tournamentId.value);

		return final_value;
	}

	const id = await checkIsInTournament();

	provide('tournamentId', id);

	function toggleIsInTournament() {
		isInTournament.value = !isInTournament.value;
	}
</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<Suspense>
		<CreateTournamentView v-if="!isInTournament" @tournament-created="toggleIsInTournament" />
	</Suspense>

	<Suspense>
		<PlayInTournamentView v-if="isInTournament" />
	</Suspense>
</template>

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
