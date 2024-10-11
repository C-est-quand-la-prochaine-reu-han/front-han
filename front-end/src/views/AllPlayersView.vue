<script setup>
</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<div class="main-container">
		<div class="data-players-title">
			<p>Photo de profil</p>
			<p>Nom d'utilisateur</p>
			<p>Surnom</p>
			<p>Matchs gagnés</p>
			<p>Matchs gagnés (%)</p>
		</div>
		<div class="data-players-container">
			<!-- <p v-if="friends_confirmed.length == 0" class="data-no-friend">Tu n'as pas d'ami·e LOOSER</p> -->
			<div class="data-players">
				<img src="/src/assets/business-cat.png" alt="Photo de profil">
				<p>Gisele</p>
				<p>Gigi</p>
				<p>42</p>
				<p>42</p>
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

	.data-players-title {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		padding: 10px;
		border-bottom: 2px solid var(--vt-c-divider-dark-1);
		text-align: center;
	}

	body.light-mode .data-players-title {
		border-bottom-color: var(--vt-c-divider-light-1);
	}

	.data-players-container {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.data-players {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		padding: 10px;
		text-align: center;
	}

	.data-players:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	.data-players p {
		margin: 0;
	}

	.data-players img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	body.light-mode .data-players:hover {
		background-color: var(--vt-c-white-mute);
	}
</style>
