<script setup>

	import { ref } from 'vue';
	import { useAuthStore } from '../stores/auth.js';
	import { get_me, get_user_by_id, request_refuse_friend, request_confirm_friend } from '/src/jspong/main.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	let friends_confirmed;
	let friends_pending;

	console.log(token);
	let pending = [];
	let friend = [];
	try {
		let me = await get_me(token);
		console.log(me);
		if (me) {
			friends_confirmed = me.friends_confirmed
			for (let i = 0; i < friends_confirmed.length; i++) {
				let new_friend = await get_user_by_id(me.friends_confirmed[i], token);
				friend.push(new_friend);
			}
			friends_pending = me.friends_pending;
			for (let i = 0; i < friends_pending.length; i++) {
				let new_pending = await get_user_by_id(me.friends_pending[i], token);
				pending.push(new_pending);
			}
		} else {
			pending = [];
			friend = [];
			console.log('ME not found');
		}
	} catch (error) {
		pending = [];
		friend = [];
		console.log('CATCH ERROR');
		console.log(error);
	}

	async function rejectFriend(friend_id) {
		console.log('refuse friend');
		console.log(friend_id.pk);
		console.log(token);
		request_refuse_friend(friend_id.pk, token);
	}

	async function acceptFriend(friend_id) {
		console.log('accept friend');
		console.log(friend_id.pk);
		console.log(token);
		request_confirm_friend(friend_id.pk, token);
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
				<div class="data-profil" v-for="friends in friend">
					<img :src="friends.avatar" alt="Photo de profil">
					<p>{{ friends.user_nick }}</p>
				</div>
			</div>
		</div>
		<div class="pending-list-container">
			<div>
				<h2>Liste d'ami·e·s en attente</h2>
			</div>
			<div class="friends-list">
				<p v-if="friends_pending.length == 0" class="data-no-friend">Tu n'as pas d'ami·e en attente</p>
				<div class="data-profil" v-for="pendings in pending">
					<!-- <p>{{ pendings }}</p> -->
					<img :src="pendings.avatar" alt="Photo de profil">
					<p>{{ pendings.user_nick }}</p>
					<button @click="acceptFriend(pendings)">✔</button>
					<button @click="rejectFriend(pendings)">✘</button>
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
