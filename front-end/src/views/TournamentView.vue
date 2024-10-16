<!--
 La variable 'isInTournament' est set a false par defaut mais il faut checker si le joueur est deja inscrit dans un tournois pour acceder a la page du tournois si c'est le cas.
 Si le joueur est deja inscrit dans un tournois, il va pouvoir lancer le jeu si c'est son tour de jouer.
 Si on peut jouer, il pourrait etre interessant de savoir ici contre qui on doit jouer.
 Dans le 'provide' il faut remplacer 'player' par le nom du joueur contre qui on doit jouer.
-->

<script setup>
	import { ref } from 'vue';
	import CreateTournamentView from './CreateTournamentView.vue';
	import GameView from './GameView.vue';

	const isInTournament = ref(false);
	const showPlayTournament = ref(false);

	function toggleIsInTournament() {
		isInTournament.value = !isInTournament.value;
	}

	function togglePlayTournament() {
		if (!showPlayTournament.value)
			provide('otherPlayerName', 'player');
		showPlayTournament.value = !showPlayTournament.value;
	}
</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<CreateTournamentView v-if="!isInTournament" @tournament-created="toggleIsInTournament" />

	<div v-else>
		<div class="play-tournament">
			<button @click="togglePlayTournament">JOUER</button>
		</div>
	</div>

	<GameView v-if="showPlayNowSolo" @close-game="togglePlayTournament" />
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

	.play-tournament {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.play-tournament button {
		padding: 10px 20px;
		background-color: var(--vt-c-black-soft);
		border: none;
		cursor: pointer;
		font-size: 2em;
	}

	body.light-mode .play-tournament button {
		background-color: var(--vt-c-white-soft);
	}

	.play-tournament button:hover {
		background-color: var(--vt-c-black-mute);
	}

	body.light-mode .play-tournament button:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
