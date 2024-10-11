<script setup>

	import { get_dashboard } from '@/jspong/main';
	import { useAuthStore } from '../stores/auth.js';

	const authStore = useAuthStore();
	const token = authStore.token;


	let dashboard = await get_dashboard(token);
	console.log(dashboard);

	let fastest_ball;
	let match_played;
	let match_wins;
	let perfect_hit_ratio;
	let perfect_hits;
	let total_hits;
	let total_score;
	let win_ratio;


	fastest_ball = dashboard.fastest_ball;
	match_played = dashboard.match_played;
	match_wins = dashboard.match_wins;
	perfect_hit_ratio = dashboard.perfect_hit_ratio.toFixed(2);
	perfect_hits = dashboard.perfect_hits;
	total_hits = dashboard.total_hits;
	total_score = dashboard.total_score;
	win_ratio = dashboard.win_ratio.toFixed(2);

	console.log(fastest_ball);
	console.log(match_played);
	console.log(match_wins);
	console.log(perfect_hit_ratio);
	console.log(perfect_hits);
	console.log(total_hits);
	console.log(total_score);
	console.log(win_ratio);

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
			<h2>Total hits</h2>
			<h1>{{ total_hits }}</h1>
		</div>
		<div class="dashboard-item border-ver-left">
			<h2>Scores total</h2>
			<h1>{{ total_score }}</h1>
		</div>
		<div class="dashboard-item border-ver-right">
			<h2>Matchs gagnés</h2>
			<h1>{{ match_wins }}</h1>
		</div>
		<div class="dashboard-item">
			<h2>Perfect hits</h2>
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
			<h2>Perfect hits (%)</h2>
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
</style>

<!--
match_played FLOAT,
match_wins FLOAT,
total_hits FLOAT,
perfect_hits FLOAT,
total_score FLOAT,
fastest_ball FLOAT,
win_ratio FLOAT,
perfect_hit_ratio FLOAT
-->
