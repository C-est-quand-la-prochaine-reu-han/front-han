<template>
	<div class="main-container">
		<div class="data-players-title">
			<p>Photo de profil</p>
			<p>Nom d'utilisateur</p>
			<p>Surnom</p>
			<p>Matchs gagnés</p>
			<p>Matchs gagnés (%)</p>
		</div>
		<div class="data-players-container">
			<p v-if="data.length === 0" class="data-no-matches">Aucun utilisateur trouvé</p>
			<div v-else class="data-players" v-for="user in data" :key="user.pk">
				<img :src="user.avatar" alt="Photo de profil">
				<p>{{ user.username }}</p>
				<p>{{ user.nickname }}</p>
				<p>{{ user.match_wins }}</p>
				<p>{{ user.win_ratio }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { get_all_users, get_dashboard, get_final_avatar } from '@/jspong/main';
	import { useAuthStore } from '@/stores/auth.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	let data = []

	try {
		let all_user = await get_all_users(token);
		for (let user of all_user) {
			let dashboard = await get_dashboard(user.pk, token);
			let data_avatar = get_final_avatar(user.avatar);
			data.push({
				pk : user.pk,
				nickname: user.user_nick,
				username: user.user.username,
				avatar: data_avatar,
				match_wins: dashboard.match_wins,
				win_ratio: (dashboard.win_ratio * 100).toFixed(2)
			})
		}
	} catch (error) {
		console.log(error);
	}


	console.log(data);
</script>

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
