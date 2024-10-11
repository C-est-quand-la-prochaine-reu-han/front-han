<script setup>

</script>

<template>
	<div class="find-new-friends-container">
		<div class="find-new-friends">
			<div>
				<h1>Ajouter des joueurs</h1>
			</div>
			<div class="input-container">
				<input type="text" v-model="friend_username" placeholder="Rechercher un nom d'utilisateur">
				<button type="button" @click="submitFriendRequest">Rechercher</button>
			</div>
		</div>
		<button>Creer un tournois</button>
	</div>
</template>

<style scoped>
	.find-new-friends-container {
		display: flex;
		flex-direction: column;
		width: 500px;
		margin: auto;
	}

	.input-container {
		display: flex;
		flex-direction: row;
		gap: 10px;
		padding: 20px;
	}

	.input-container button {
		padding: 10px;
		background-color: var(--vt-c-black-soft);
	}

	.input-container button:hover {
		background-color: var(--vt-c-black-mute);
	}

	input {
		flex: 1;
		padding: 10px;
		border: 1px solid var(--vt-c-divider-dark-1);
		background: var(--vt-c-black-soft);
		color: var(--vt-c-text-dark-2);
	}
</style>
