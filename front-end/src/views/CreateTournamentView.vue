<!--
 La liste des joueurs s'affiche au fur et a mesure que tu ajoutes des gens au tournois.
 On ne peut inviter que des gens qui ne sont pas deja dans un tournois.
 Lorsqu'on a fini d'ajouter des gens, on cree le tournois. On doit emettre un signal 'tournament-created' pour que le composant 'TournamentView' sache qu'on est dans un tournois.
-->

<script setup>
</script>

<template>
	<div class="find-new-players-container">
		<div class="find-new-players">
			<div>
				<h1>Ajouter des joueur·se·s</h1>
			</div>
			<div class="input-container">
				<input type="text" v-model="friend_username" placeholder="Rechercher un nom d'utilisateur">
				<button type="button" @click="submitFriendRequest">Rechercher</button>
			</div>
		</div>
		<div>
			<h1>Liste des joueur·se·s</h1>
			<div class="players-list" >
				<img src="/src/assets/business-cat.png" alt="Photo de profil">
				<p>Nom d'utilisateur</p>
				<p>Surnom</p>
			</div>
		</div>
		<button class="create-button">Créer un tournoi</button>
	</div>
</template>

<style scoped>
	.find-new-players-container {
		display: flex;
		flex-direction: column;
		width: 500px;
		margin: auto;
	}

	h1 {
		font-size: 1.4em;
	}

	.input-container {
		display: flex;
		flex-direction: row;
		gap: 10px;
		padding: 20px;
	}

	button {
		padding: 10px 20px;
		background-color: var(--vt-c-black-soft);
		border: none;
		cursor: pointer;
	}

	body.light-mode button {
		background-color: var(--vt-c-white-soft);
	}

	button:hover {
		background-color: var(--vt-c-black-mute);
	}

	body.light-mode button:hover {
		background-color: var(--vt-c-white-mute);
	}

	input {
		flex: 1;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: var(--vt-c-black-soft);
		color: var(--vt-c-text-dark-2);
	}

	body.light-mode input {
		border-color: var(--vt-c-divider-light-1);
		background: var(--vt-c-white-soft);
		color: var(--vt-c-text-light-2);
	}

	.players-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		text-align: center;
	}

	.players-list img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.create-button {
		margin-top: 30px;
	}
</style>
