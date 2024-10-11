<script setup>
</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<div class="dashboard-container">
		<div class="dashboard-item border-ver-right">
			<h2>Matchs joués</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item">
			<h2>Total hits</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item border-ver-left">
			<h2>Scores total</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item border-ver-right">
			<h2>Matchs gagnés</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item">
			<h2>Perfect hits</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item border-ver-left">
			<h2>Vitesse max</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item border-ver-right">
			<h2>Matchs gagnés (%)</h2>
			<h1>42</h1>
		</div>
		<div class="dashboard-item">
			<h2>Perfect hits (%)</h2>
			<h1>42</h1>
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
