<script setup>
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
			<!-- <p v-if="friends_confirmed.length == 0" class="data-no-friend">Tu n'as pas d'ami·e LOOSER</p> -->
			<div class="data-match">
				<p>23-09-1998</p>
				<p>Gisele</p>
				<p>42</p>
				<p>42</p>
				<p>42</p>
				<p>Albert</p>
				<p>21</p>
				<p>42</p>
				<p>0</p>
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
</style>
