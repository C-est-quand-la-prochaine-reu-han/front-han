<script setup>
	import { ref, provide, inject } from 'vue';
	import GameView from './GameView.vue';
	import { get_tournament_by_id, get_user_by_id } from '/src/jspong/main.js';
	import { useAuthStore } from '../stores/auth.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	const showPlayTournament = ref(false);
	const tournamentId = inject('tournamentId');

	console.log('tournamentId', tournamentId);
	let tournament = await get_tournament(tournamentId, token);
	let players = tournament.pending;
	let possible_macthes = [];
	//let all_users_in_tournament = ref([]);



	async function get_tournament(tournamentId, token) {
		let temp_tournament = {};
		try {
			temp_tournament = await get_tournament_by_id(tournamentId, token);
		} catch (error) {
			console.log(error);
		}
		return temp_tournament;
	}

	// async function get_all_users_in_tournament() {
	// 	try {
	// 		console.log('PARAMS : ', tournamentId, token);
	// 		all_users_in_tournament.value = await get_all_users_of_tournament(tournamentId, token);
	// 		console.log('ALL USERS : ', all_users_in_tournament.value);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	async function set_all_possible_matches() {
		let id = 0;
		for (let i = 0; i < players.length; i++) {
			for (let j = i + 1; j < players.length; j++) {
				let username1 = await get_user_by_id(players[i], token);
				let username2 = await get_user_by_id(players[j], token);
				console.log(username1, username2);	
				possible_macthes.push({
					pk: id,
					player1_pk: players[i],
					player1_username: username1.user.username,
					player2_pk: players[j],
					player2_username: username2.user.username
				});
				id++;
			}
		}
	}

	function togglePlayTournament() {
		if (!showPlayTournament.value)
			provide('otherPlayerName', 'player');
		showPlayTournament.value = !showPlayTournament.value;
	}

	function get_username_by_pk(pk) {
		console.log('all_users_in_tournament', all_users_in_tournament.value);
		for (let user of all_users_in_tournament.value) {
			if (user.pk === pk) {
				return user.username;
			}
		}
	}

	//get_all_users_in_tournament();
	await set_all_possible_matches();
</script>

<template>
		<div class="play-tournament" v-for="matches in possible_macthes" :key="matches.pk">
			<h1>{{ matches.pk }} : {{ matches.player1_username }} VS {{ matches.player2_username }}</h1>
			<button @click="togglePlayTournament">JOUER</button>
		</div>
		<GameView v-if="showPlayNowSolo" @close-game="togglePlayTournament" />
</template>

<style scoped>
</style>
