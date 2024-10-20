<script setup>
	import { get_me, get_all_tournament, get_all_matches_of_tournament, get_nickname_by_id, get_user_by_id } from '@/jspong/main';
	import { useAuthStore } from '@/stores/auth';

	const authStore = useAuthStore();
	const token = authStore.token;
	console.log(token);

	let final_values = [];
	let me;
	let tournament = [];

	me = await get_me(token);
	tournament = await get_all_tournament(token);

	for (let data of tournament) {
		let matches_of_the_tournament = await get_all_matches_of_tournament(data.pk, token);
		let playerWins = {};
		for (let match of matches_of_the_tournament) {
			let player1 = match.player1;
			let player2 = match.player2;
			if (playerWins[player1] === undefined) {
				playerWins[player1] = 0;
			}
			if (playerWins[player2] === undefined) {
				playerWins[player2] = 0;
			}
			if (match.player1_score > match.player2_score) {
				playerWins[player1]++;
			} else {
				playerWins[player2]++;
			}
		}

		let maxWin = 0;
		let winnerMatch = [];
		for (const [player, points] of Object.entries(playerWins)) {
            if (points > maxWin) {
                maxWin = points;
                winnerMatch = [player];
            } else if (points === maxWin) {
                winnerMatch.push(player);
            }
        }

		let winner = '';

		if (winnerMatch.length === 1) {
			let user;
			try {
				user = await get_user_by_id(winnerMatch[0], token);
			} catch (e) {
				console.log(e);
			}
			winner = user.user.username;
		} else {
			let playerScores = {};
			for (let match of matches_of_the_tournament) {
				let player1 = match.player1;
				let player2 = match.player2;
				if (playerScores[player1] === undefined) {
					playerScores[player1] = 0;
				}
				if (playerScores[player2] === undefined) {
					playerScores[player2] = 0;
				}
				playerScores[player1] += match.player1_score;
				playerScores[player2] += match.player2_score;
			}

			let maxPoints = 0;
			let maxPlayers = [];
			for (const [player, points] of Object.entries(playerScores)) {
				if (points > maxPoints) {
					maxPoints = points;
					maxPlayers = [player];
				} else if (points === maxPoints) {
					maxPlayers.push(player);
				}
			}

			for (let i = 0; i < maxPlayers.length; i++) {
				console.log(maxPlayers[i]);
				let user;
				try {
					user = await get_user_by_id(maxPlayers[i], token);
				} catch (e) {
					console.log(e);
				}
				winner += user.user.username;
				if (i < maxPlayers.length - 1) {
					winner += ', ';
				}
			}
		}


		// let winner = '';
		// 	for (let i = 0; i < winnerMatch.length; i++) {
		// 		let user;
		// 		try {
		// 			user = await get_user_by_id(winnerMatch[i], token);
		// 		} catch (e) {
		// 			console.log(e);
		// 		}
		// 		winner += user.user.username;
		// 		if (i < winnerMatch.length - 1) {
		// 			winner += ', ';
		// 		}
		// 	}
		// 	winnerMatch = winner;

		let players = '';
		for (let i = 0; i < data.pending.length; i++) {
			let user;
			try {
				user = await get_user_by_id(data.pending[i], token);
			} catch (e) {
				console.log(e);
			}
			players += user.user.username;
			if (i < data.pending.length - 1) {
				players += ', ';
			}
		}
		final_values.push({
			tournament_name: data.name,
			creator: data.creator.user.username,
			players_nb: data.pending.length,
			winner: winner,
			players: players
		});
	}
</script>

<template>
	<button class="back-button" @click="$emit('close')">
		<h1>←</h1>
	</button>

	<div class="main-container">
		<div class="data-match-title">
			<p>Nom du Tournoi</p>
			<p>Créateur</p>
			<p>Nombre de joueurs</p>
			<p>Gagnant(s)</p>
			<p>Participants</p>
		</div>
		<div class="data-match-container">
			<div v-if="final_values.length === 0" class="data-no-matches">Aucun tournoi a ton actif</div>
			<div v-else class="data-match" v-for="tournament in final_values">
				<p>{{ tournament.tournament_name }}</p>
				<p>{{ tournament.creator }}</p>
				<p>{{ tournament.players_nb }}</p>
				<p>{{ tournament.winner }}</p>
				<p>{{ tournament.players }}</p>

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
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

	.data-no-matches {
		text-align: center;
		padding: 10px;
	}
</style>
