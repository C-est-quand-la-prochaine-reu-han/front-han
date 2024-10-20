<script setup>

	import { ref } from 'vue';
	import { useAuthStore } from '../stores/auth.js';
	import { get_me, get_user_by_id, get_final_avatar } from '/src/jspong/main.js';

	const authStore = useAuthStore();
	const token = authStore.token;

	// let friends_confirmed = ref([]);
	let friends_pending = ref([]);

	let pending = ref([]);
	// let friend = ref([]);

	update_list();

	async function update_list()
	{
		try {
			let me = await get_me(token);
			if (me) {
				// friends_confirmed.value = me.friends_confirmed
				// friend.value = [];
				// for (let i = 0; i < friends_confirmed.value.length; i++) {
				// 	let new_friend = await get_user_by_id(me.friends_confirmed[i], token);
				// 	friend.value.push(new_friend);
				// }
				friends_pending.value = me.friends_pending;
				pending.value = [];
				for (let i = 0; i < friends_pending.value.length; i++) {
					let new_pending = await get_user_by_id(me.friends_pending[i], token);
					console.log(new_pending);
					let connected = false;
					let formattedLastAccess = "";
					
					if (new_pending.last_access !== null) {
						const lastAccessTime = new Date(new_pending.last_access);
						const currentTime = new Date();
						const timeDifference = currentTime.getTime() - lastAccessTime.getTime();
						const minutesDifference = Math.floor(timeDifference / (1000 * 60));

						if (minutesDifference < 1 || new_pending.user.username === 'bot') {
							connected = true;
						}
						formattedLastAccess = minutesDifference + "m";
					} else {
						connected = true;
					}
					let data_avatar = get_final_avatar(new_pending.avatar);
					let friend = {
						avatar: data_avatar,
						user_nick: new_pending.user_nick,
						pk: new_pending.pk,
						connected: connected,
						last_access: formattedLastAccess
					}
					pending.value.push(friend);
				}
			} else {
				pending.value = [];
				// friend.value = [];
			}
		} catch (error) {
			pending.value = [];
			// friend.value = [];
			console.log(error);
		}
	}

	// async function rejectFriend(friend_id)	{
	// 	await request_refuse_friend(friend_id.pk, token);
	// 	console.log('update list');
	// 	update_list();
	// }

	// async function acceptFriend(friend_id) {
	// 	await request_confirm_friend(friend_id.pk, token);
	// 	update_list();
	// }

</script>

<template>
	<div class="right-part">
		<!-- <div class="friends-list-container">
			<div>
				<h2>Liste d'ami·e·s</h2>
			</div>
			<div class="friends-list">
				<p v-if="friend.length == 0" class="data-no-friend">Tu n'as pas d'ami·e LOSER</p>
				<div class="data-profil" v-for="friends in friend">
					<img :src="friends.avatar" alt="Photo de profil">
					<p>{{ friends.user_nick }}</p>
				</div>
			</div>
		</div> -->
		<div class="pending-list-container">
			<div>
				<h2>Liste d'ami·e·s</h2>
			</div>
			<div class="friends-list">
				<p v-if="pending.length == 0" class="data-no-friend">Tu n'as pas d'ami·e LOSER</p>
				<div class="data-profil" v-for="pendings in pending">
					<img :src="pendings.avatar" alt="Photo de profil">
					<p>{{ pendings.user_nick }}</p>
					<p v-if="pendings.connected">en ligne</p>
					<p v-else>hors ligne ({{ pendings.last_access }})</p>
					<!-- <button @click="acceptFriend(pendings)">✔</button>
					<button @click="rejectFriend(pendings)">✖</button> -->
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
		height: 500px;
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
