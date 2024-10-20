import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
	state: () => ({
		opponent: null,
		tournamentId: 0,
	}),
	actions: {
		setOpponent(opponent) {
			this.opponent = opponent;
		},
		setTournamentId(id) {
			this.tournamentId = id;
		}
	}
});
