<template>
	<div class="find-new-players-container">
		<div>
			<div>
				<h1>Nom du tournoi</h1>
			</div>
			<div class="rename-tournament">
				<input
					type="text"
					v-model="tournament_name"
					placeholder="Nommer le tournoi"
				/>
			</div>
		</div>
		<div class="find-new-players">
			<div>
				<h1>Ajouter des joueur·se·s</h1>
			</div>
			<div class="input-container">
				<input
					type="text"
					v-model="username_to_add"
					placeholder="Rechercher un nom d'utilisateur"
				/>
				<button type="button" @click="addUserToTournament">Rechercher</button>
			</div>
		</div>
		<div>
			<h1>Liste des joueur·se·s</h1>
			<p class="no-player" v-if="player_in_tournament.length === 0">
				Personne n'est invité dans le tournoi
			</p>
			<div v-else class="players-list" v-for="player in player_in_tournament">
				<img :src="player.avatar" alt="Photo de profil" />
				<p>{{ player.user.username }}</p>
				<p>{{ player.user_nick }}</p>
			</div>
		</div>
		<button class="create-button" @click="createTournament()">
			Créer un tournoi
		</button>
	</div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { useGameStore } from '@/stores/game';
import {
	get_user_by_username,
	create_tournament,
	user_is_in_tournament,
} from '@/jspong/main.js';
import { get_final_avatar } from '@/jspong/main.js';
const emit = defineEmits(['tournament-created']);

const authStore = useAuthStore();
const token = authStore.token;

const gameStore = useGameStore();

let player_in_tournament = ref([]);
const username_to_add = ref('');
const tournament_name = ref('');

async function addUserToTournament() {
	if (username_to_add.value === 'bot') {
		alert('Il est pas assez payé pour ça');
		return;
	}
	if (username_to_add.value === '') {
		alert("Le nom d'utilisateur ne peut pas etre vide");
		return;
	}
	for (let i = 0; i < player_in_tournament.value.length; i++) {
		if (player_in_tournament.value[i].user.username === username_to_add.value) {
			alert('Utilisateur deja dans le tournois');
			return;
		}
	}
	try {
		let user = await get_user_by_username(username_to_add.value, token);
		if (user) {
			if ((await user_is_in_tournament(user.pk, token)) !== -1) {
				alert('Utilisateur deja dans un tournois');
				return;
			}
			user.avatar = get_final_avatar(user.avatar);
			player_in_tournament.value.push(user);
		} else {
			alert('Utilisateur introuvable');
		}
	} catch (error) {
		console.log(error);
		alert('Utilisateur introuvable');
	}
}

async function createTournament() {
	console.log('create tournament');
	if (player_in_tournament.value.length === 0) {
		alert("Personne n'est invite dans le tournois");
		return;
	}
	if (player_in_tournament.value.length < 3) {
		alert('Il faut au moins 3 joueur·se·s pour creer un tournois');
		return;
	}
	console.log(tournament_name.value);
	if (tournament_name.value === '') {
		alert('Le nom du tournois ne peut pas etre vide');
		return;
	}
	try {
		let tournament = await create_tournament(
			tournament_name.value,
			player_in_tournament.value,
			token
		);
		gameStore.setTournamentId(tournament.pk);
		emit('tournament-created');
	} catch (error) {
		console.log(error);
	}
}
</script>

<style scoped>
.find-new-players-container {
	display: flex;
	flex-direction: column;
	width: 500px;
	margin: auto;
}

.rename-tournament {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 20px;
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

.no-player {
	text-align: center;
}
</style>
