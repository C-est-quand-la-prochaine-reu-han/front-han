<script setup>
	import { ref, provide, inject } from 'vue';
	import GameView from './GameView.vue';
	import { get_tournament_by_id, get_user_by_id, get_me, get_all_matches_of_tournament} from '/src/jspong/main.js';
	import { useAuthStore } from '../stores/auth.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	const showPlayTournament = ref(false);

	const otherPlayerName = ref('');
	const tournamentId = inject('tournamentId');

	provide('otherPlayerName', otherPlayerName);
	provide('tournamentId', tournamentId);

	let tournament = await get_tournament(tournamentId, token);
	let players = tournament.pending;
	let possible_matches = [];
	let me = ref(null);
	let all_matches_of_tournament = ref([]);

	me.value = await get_me(token);
	all_matches_of_tournament.value = await get_all_matches_of_tournament(tournamentId, token);
	console.log('all_matches_of_tournament', all_matches_of_tournament.value);

	async function get_tournament(tournamentId, token) {
		let temp_tournament = {};
		try {
			temp_tournament = await get_tournament_by_id(tournamentId, token);
		} catch (error) {
			console.log(error);
		}
		return temp_tournament;
	}

	async function set_all_possible_matches() {
		let id = 0;
		for (let i = 0; i < players.length; i++) {
			for (let j = i + 1; j < players.length; j++) {
				let username1 = await get_user_by_id(players[i], token);
				let username2 = await get_user_by_id(players[j], token);
				let already_played = false;
				for (let match of all_matches_of_tournament.value) {
					if ((match.player1 === players[i] && match.player2 === players[j]) || (match.player1 === players[j] && match.player2 === players[i])) {
						already_played = true;
						break;
					}
				}
				console.log(username1, username2);	
				possible_matches.push({
					pk: id,
					player1_pk: players[i],
					player1_username: username1.user.username,
					player2_pk: players[j],
					player2_username: username2.user.username,
					already_played: already_played
				});
				id++;
			}
		}
	}

	function startGame(match) {
		if (!showPlayTournament.value)
		{
			if (match.player1_pk === me.value.pk) {
				otherPlayerName.value = match.player2_username;
			} else if (match.player2_pk === me.value.pk) {
				otherPlayerName.value = match.player1_username;
			}
		}
		togglePlayTournament();
	}

	function togglePlayTournament() {
		showPlayTournament.value = !showPlayTournament.value;
	}

	await set_all_possible_matches();
</script>

<template>
	<div class="play-tournament-container" v-if="!showPlayTournament">
		<div class="play-tournament" v-for="match in possible_matches" :key="match.pk">
			<p>{{ match.pk }} : {{ match.player1_username }} VS {{ match.player2_username }}</p>
			<button v-if="!match.already_played && (match.player1_pk === me.pk || match.player2_pk === me.pk)" @click="startGame(match)">JOUER</button>
			<p v-else-if="match.already_played && (match.player1_pk === me.pk || match.player2_pk === me.pk)">Deja joue</p>
			<p v-else >Pas pour toi</p>
		</div>
	</div>

	<GameView v-if="showPlayTournament" @close-game="togglePlayTournament" />
</template>

<style scoped>
	.play-tournament-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 20px;
		margin: auto;
	}

	.play-tournament {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 50px;
	}

	.play-tournament p {
		font-size: 1.4em;
		margin: 0;
	}

	.play-tournament button {
		padding: 10px 20px;
		background-color: var(--vt-c-black-soft);
		border: none;
		cursor: pointer;
		font-size: 1.4em;
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
