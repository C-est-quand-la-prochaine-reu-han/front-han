<script setup>

	import { get_all_matches_of_user, get_me, get_nickname_by_id } from '@/jspong/main';
	import { useAuthStore } from '../stores/auth.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	let me = {
		pk: -1,
	}
	try {
		me = await get_me(token);
	} catch (error) {
		console.log('No user found');
	}
	let matches = [];

	try{
		matches = await get_all_matches_of_user(me.pk, token);
	} catch (error) {
		console.log('No match found');
	}
	console.log(matches);
	for (let match of matches) {
		match.match_start_time = match.match_start_time.split('T')[0];
	}

</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<div class="main-container">
		<div class="data-match-title">
			<p>Date</p>
			<p>Joueur 1</p>
			<p>Score J1</p>
			<p>Hit J1</p>
			<p>Perfect hit J1</p>
			<p>Joueur 2</p>
			<p>Score J2</p>
			<p>Hit J2</p>
			<p>Perfect hit J2</p>
		</div>
		<div class="data-match-container">
			<div v-if="matches.length === 0" class="data-no-matches">Aucun match a ton actif</div>
			<div v-else class="data-match" v-for="match in matches" :key="match.id">
				<p>{{ match.match_start_time }}</p>
				<p>{{ match.player1 }}</p>
				<p>{{ match.player1_score }}</p>
				<p>{{ match.player1_hit_nb }}</p>
				<p>{{ match.player1_perfect_hit_nb }}</p>
				<p>{{ match.player2 }}</p>
				<p>{{ match.player2_score }}</p>
				<p>{{ match.player2_hit_nb }}</p>
				<p>{{ match.player2_perfect_hit_nb }}</p>
			</div>
		</div>
	</div>



	<div>

	</div>
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

	.main-container {
		width: 1000px;
		height: 600px;
		margin: auto;
	}

	.data-match-title {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		padding: 10px;
		border-bottom: 2px solid var(--vt-c-divider-dark-1);
		text-align: center;
	}

	body.light-mode .data-match-title {
		border-bottom-color: var(--vt-c-divider-light-1);
	}

	.data-match-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.data-match {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		padding: 10px;
		text-align: center;
	}

	.data-match:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	.data-match p {
		margin: 0;
	}

	body.light-mode .data-match:hover {
		background-color: var(--vt-c-white-mute);
	}

	.data-no-matches {
		text-align: center;
		padding: 10px;
	}
</style>
