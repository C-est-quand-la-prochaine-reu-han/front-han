<script setup>

	import { get_all_users } from '@/jspong/main.js';
	import { useAuthStore } from '../stores/auth.js';
	import { get_me, get_user_by_id, request_refuse_friend, request_confirm_friend } from '/src/jspong/main.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	let friends_confirmed;
	let friends_pending;

	console.log(token);
	try {
		let me = await get_me(token);
		console.log(me);
		if (me) {
			friends_confirmed = me.friends_confirmed;
			let friend = [];
			for (let i = 0; i < friends_confirmed.length; i++) {
				let new_friend = get_user_by_id(me.friends_confirmed[i]);
				friend.push(new_friend);
			}
			friends_pending = me.friends_pending;
			let pending = [];
			for (let i = 0; i < friends_pending.length; i++) {
				new_pending = get_user_by_id(pending[i]);
				pending.push(new_pending);
			}
		} else {
			console.log('No user found');
		}
	} catch (error) {
		console.log('No user found');
	}


	async function rejectFriend(friend_id) {
		console.log('refuse friend');
		console.log(friend_id);
		console.log(token);
		request_refuse_friend(friend_id, token);
	}

	async function acceptFriend(friend_id) {
		console.log('accept friend');
		console.log(friend_id);
		console.log(token);
		request_confirm_friend(friend_id, token);
	}

</script>

<template>
	<div class="right-part">
		<div class="friends-list-container">
			<div>
				<h2>Liste d'ami·e·s</h2>
			</div>
			<div class="friends-list">
				<p v-if="friends_confirmed.length == 0" class="data-no-friend">Tu n'as pas d'ami·e LOSER</p>
				<div class="data-profil" v-for="friend in friends_confirmed">
					<img :src="friend.avatar" alt="Photo de profil">
					<p>{{ friend.username }}</p>
				</div>
			</div>
		</div>
		<div class="pending-list-container">
			<div>
				<h2>Liste d'ami·e·s en attente</h2>
			</div>
			<div class="friends-list">
				<p v-if="friends_pending.length == 0" class="data-no-friend">Tu n'as pas d'ami·e en attente</p>
				<div class="data-profil" v-for="pending in friends_pending">
					<img :src="pending.avatar" alt="Photo de profil">
					<p>{{ pending.username }}</p>
					<button @click="acceptFriend(pending)">✔</button>
					<button @click="rejectFriend(pending)">✘</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.right-part {
		width: 50%;
		padding-left: 25px;
		display: grid;
		grid-template-rows: 3fr 2fr;
	}

	h2 {
		font-size: 1.2em;
	}

	.friends-list-container {
		height: 284px;
		display: flex;
		flex-direction: column;
		padding-bottom: 20px;
	}

	.pending-list-container {
		height: 176px;
		display: flex;
		flex-direction: column;
	}

	.friends-list {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		border: 1px solid var(--vt-c-divider-dark-1);
	}

	body.light-mode .friends-list {
		border-color: var(--vt-c-divider-light-1);
	}

	.data-profil {
		display: flex;
		flex-direction: row;
		padding: 10px;
	}

	.data-profil:hover {
		background-color: var(--vt-c-black-mute);
		transition: background-color 0.3s linear;
	}

	body.light-mode .data-profil:hover {
		background-color: var(--vt-c-white-mute);
	}

	.data-profil img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.data-profil p {
		width: 100%;
		margin: auto;
		margin-left: 20px;
		margin-right: 20px;
	}

	.data-profil button {
		margin: auto;
		padding-right: 30px;
		font-size: 1.4em;
	}

	.data-no-friend {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
