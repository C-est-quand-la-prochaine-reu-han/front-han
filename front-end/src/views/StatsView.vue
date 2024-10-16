<script setup>

	import { get_dashboard, get_me } from '@/jspong/main';
	import { useAuthStore } from '../stores/auth.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	let fastest_ball = -1;
	let match_played = -1;
	let match_wins = -1;
	let perfect_hit_ratio = -1;
	let perfect_hits = -1;
	let total_hits = -1;
	let total_score = -1;
	let win_ratio = -1;

	try {
		let me = await get_me(token);

		let dashboard = await get_dashboard(me.pk, token);
		fastest_ball = dashboard.fastest_ball;
		match_played = dashboard.match_played;
		match_wins = dashboard.match_wins;
		perfect_hit_ratio = (dashboard.perfect_hit_ratio * 100).toFixed(2);
		perfect_hits = dashboard.perfect_hits;
		total_hits = dashboard.total_hits;
		total_score = dashboard.total_score;
		win_ratio = (dashboard.win_ratio * 100).toFixed(2);
	} catch (error) {
		console.log(error);
	}





</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<div class="dashboard-container">
		<div class="dashboard-item border-ver-right">
			<h2>Matchs joués</h2>
			<h1>{{ match_played }}</h1>
		</div>
		<div class="dashboard-item">
			<h2>Coups totaux</h2>
			<h1>{{ total_hits }}</h1>
		</div>
		<div class="dashboard-item border-ver-left">
			<h2>Score total</h2>
			<h1>{{ total_score }}</h1>
		</div>
		<div class="dashboard-item border-ver-right">
			<h2>Matchs gagnés</h2>
			<h1>{{ match_wins }}</h1>
		</div>
		<div class="dashboard-item">
			<h2>Coups parfaits</h2>
			<h1>{{ perfect_hits }}</h1>
		</div>
		<div class="dashboard-item border-ver-left">
			<h2>Vitesse max</h2>
			<h1>{{ fastest_ball }}</h1>
		</div>
		<div class="dashboard-item border-ver-right">
			<h2>Matchs gagnés (%)</h2>
			<h1>{{ win_ratio }}</h1>
		</div>
		<div class="dashboard-item">
			<h2>Coups parfaits (%)</h2>
			<h1>{{ perfect_hit_ratio }}</h1>
		</div>
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

	.dashboard-container {
		display: grid;
		grid-template-columns: auto auto auto;
		margin: auto;
	}

	.dashboard-item {
		padding: 10px;
		text-align: center;
		width: 240px;
	}

	h2 {
		font-size: 1.4em;
		margin: 0;
	}

	.border-ver-right {
		border-right: 2px solid var(--vt-c-divider-dark-1);
	}

	.border-ver-left {
		border-left: 2px solid var(--vt-c-divider-dark-1);
	}

	body.light-mode .border-ver-right {
		border-right-color: var(--vt-c-divider-light-1);
	}

	body.light-mode .border-ver-left {
		border-left-color: var(--vt-c-divider-light-1);
	}
</style>
